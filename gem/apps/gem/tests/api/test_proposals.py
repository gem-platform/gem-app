from starlette.testclient import TestClient

# Test auauthorized access


def test_unauth_read_proposals(uclient: TestClient):
    response = uclient.get("/proposals/")
    assert response.status_code == 401
    assert response.json() == {"detail": "Not authenticated"}


def test_unauth_create_proposal(uclient: TestClient):
    response = uclient.post("/proposals/")
    assert response.status_code == 401
    assert response.json() == {"detail": "Not authenticated"}


def test_unauth_delete_proposal(uclient: TestClient):
    response = uclient.delete("/proposals/0")
    assert response.status_code == 401
    assert response.json() == {"detail": "Not authenticated"}


def test_unauth_update_proposal(uclient: TestClient):
    response = uclient.put("/proposals/0")
    assert response.status_code == 401
    assert response.json() == {"detail": "Not authenticated"}


# Test access

def test_read_proposals(client: TestClient):
    response = client.get("/proposals/")
    assert response.status_code == 200
    assert response.json() == []


def test_post_proposal(client: TestClient, proposal: dict):
    response = client.post("/proposals/", json=proposal)
    assert response.status_code == 200
    assert response.json() == {"oid": 1, **proposal}


def test_post_proposal_created(client: TestClient, proposal: dict):
    response = client.post("/proposals/", json=proposal)
    response = client.get("/proposals/")
    assert response.status_code == 200
    assert response.json() == [{"oid": 1, **proposal}]


def test_post_proposal_title_length(client: TestClient, proposal: dict):
    proposal["title"] = "s"  # short proposal title
    response = client.post("/proposals/", json=proposal)
    assert response.status_code == 422


def test_update_proposal(client: TestClient, proposal: dict):
    changed = {**proposal, "title": "changed"}
    response = client.post("/proposals/", json=proposal)
    response = client.put("/proposals/1", json=changed)
    assert response.status_code == 200
    assert response.json() == {"oid": 1, **changed}


def test_update_proposal_404(client: TestClient, proposal: dict):
    response = client.put("/proposals/999", json=proposal)
    assert response.status_code == 404
    assert response.json() == {"detail": "Proposal not found"}


def test_delete_proposal_deleted(client: TestClient, proposal):
    response = client.post("/proposals/", json=proposal)
    response = client.delete("/proposals/1")
    response = client.get("/proposals/")
    assert response.status_code == 200
    assert response.json() == []


def test_delete_proposal_404(client: TestClient):
    response = client.delete("/proposals/999")
    assert response.status_code == 404
    assert response.json() == {"detail": "Proposal not found"}


def test_fetch_proposal(client: TestClient, proposal):
    response = client.post("/proposals/", json=proposal)
    response = client.get("/proposals/1")
    assert response.status_code == 200
    assert response.json() == {"oid": 1, **proposal}

# Lock proposal


def test_lock_proposal(client: TestClient, proposal):
    response = client.post("/proposals/", json=proposal)
    response = client.post("/proposals/1/lock")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_update_locked_proposal(client: TestClient, proposal):
    response = client.post("/proposals/", json=proposal)
    response = client.post("/proposals/1/lock")
    response = client.put("/proposals/1", json=proposal)
    assert response.status_code == 400
    assert response.json() == {"detail": "Proposal is locked for modification"}


def test_send_oid_ignored(client: TestClient, proposal):
    response = client.post("/proposals/", json={"oid": 99, **proposal})
    assert response.status_code == 200
    assert response.json()["oid"] != 99
