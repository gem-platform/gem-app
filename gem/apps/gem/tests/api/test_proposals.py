

def test_unauth_read_proposals(uclient):
    response = uclient.get("/proposals/")
    assert response.status_code == 401
    assert response.json() == {"detail": "Not authenticated"}


def test_unauth_create_proposal(uclient):
    response = uclient.post("/proposals/")
    assert response.status_code == 401
    assert response.json() == {"detail": "Not authenticated"}


def test_unauth_delete_proposal(uclient):
    response = uclient.delete("/proposals/0")
    assert response.status_code == 401
    assert response.json() == {"detail": "Not authenticated"}


def test_unauth_update_proposal(uclient):
    response = uclient.put("/proposals/0")
    assert response.status_code == 401
    assert response.json() == {"detail": "Not authenticated"}


def test_read_proposals(client):
    response = client.get("/proposals/")
    assert response.status_code == 200


def test_delete_proposal_404(client):
    response = client.delete("/proposals/999")
    assert response.status_code == 404
    assert response.json() == {"detail": "Proposal not found"}
