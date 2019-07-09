from starlette.testclient import TestClient

# Test auauthorized access


def test_unauth_read_roles(uclient: TestClient):
    response = uclient.get("/roles/")
    assert response.status_code == 401
    assert response.json() == {"detail": "Not authenticated"}


# Test access


def test_read_roles(client: TestClient):
    # note: some predifined roles are created by recreate_db
    response = client.get("/roles/")
    assert response.status_code == 200
    assert response.json() != []
