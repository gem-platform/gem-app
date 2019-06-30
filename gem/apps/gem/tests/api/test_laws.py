from starlette.testclient import TestClient

# Test auauthorized access


def test_unauth_read_laws(uclient: TestClient):
    response = uclient.get("/laws/")
    assert response.status_code == 401
    assert response.json() == {"detail": "Not authenticated"}


def test_unauth_create_law(uclient: TestClient):
    response = uclient.post("/laws/")
    assert response.status_code == 401
    assert response.json() == {"detail": "Not authenticated"}


def test_unauth_delete_law(uclient: TestClient):
    response = uclient.delete("/laws/0")
    assert response.status_code == 401
    assert response.json() == {"detail": "Not authenticated"}


def test_unauth_update_law(uclient: TestClient):
    response = uclient.put("/laws/0")
    assert response.status_code == 401
    assert response.json() == {"detail": "Not authenticated"}


# Test access

def test_read_laws(client: TestClient):
    response = client.get("/laws/")
    assert response.status_code == 200
    assert response.json() == []


def test_post_law(client: TestClient, law: dict):
    response = client.post("/laws/", json=law)
    assert response.status_code == 200
    assert response.json() == {"oid": 1, **law}


def test_post_law_created(client: TestClient, law: dict):
    response = client.post("/laws/", json=law)
    response = client.get("/laws/")
    assert response.status_code == 200
    assert response.json() == [{"oid": 1, **law}]


def test_post_law_title_length(client: TestClient, law: dict):
    law["title"] = "s"  # short law title
    response = client.post("/laws/", json=law)
    assert response.status_code == 422


def test_update_law(client: TestClient, law: dict):
    changed = {**law, "title": "changed"}
    response = client.post("/laws/", json=law)
    response = client.put("/laws/1", json=changed)
    assert response.status_code == 200
    assert response.json() == {"oid": 1, **changed}


def test_update_law_404(client: TestClient, law: dict):
    response = client.put("/laws/999", json=law)
    assert response.status_code == 404
    assert response.json() == {"detail": "Law not found"}


def test_delete_law_deleted(client: TestClient, law):
    response = client.post("/laws/", json=law)
    response = client.delete("/laws/1")
    response = client.get("/laws/")
    assert response.status_code == 200
    assert response.json() == []


def test_delete_law_404(client: TestClient):
    response = client.delete("/laws/999")
    assert response.status_code == 404
    assert response.json() == {"detail": "Law not found"}


def test_fetch_law(client: TestClient, law):
    response = client.post("/laws/", json=law)
    response = client.get("/laws/1")
    assert response.status_code == 200
    assert response.json() == {"oid": 1, **law}

# Lock law


def test_lock_law(client: TestClient, law):
    response = client.post("/laws/", json=law)
    response = client.post("/laws/1/lock")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_update_locked_law(client: TestClient, law):
    response = client.post("/laws/", json=law)
    response = client.post("/laws/1/lock")
    response = client.put("/laws/1", json=law)
    assert response.status_code == 400
    assert response.json() == {"detail": "Law is locked for modification"}
