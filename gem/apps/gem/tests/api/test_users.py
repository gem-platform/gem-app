from starlette.testclient import TestClient

__USERS_IN_DB = 2

# Test auauthorized access


def test_unauth_read_users(uclient: TestClient):
    response = uclient.get("/users/")
    assert response.status_code == 401
    assert response.json() == {"detail": "Not authenticated"}


def test_unauth_create_user(uclient: TestClient):
    response = uclient.post("/users/")
    assert response.status_code == 401
    assert response.json() == {"detail": "Not authenticated"}


def test_unauth_delete_user(uclient: TestClient):
    response = uclient.delete("/users/0")
    assert response.status_code == 401
    assert response.json() == {"detail": "Not authenticated"}


def test_unauth_update_user(uclient: TestClient):
    response = uclient.put("/users/0")
    assert response.status_code == 401
    assert response.json() == {"detail": "Not authenticated"}


# Test access

def test_read_users(client: TestClient):
    # note: two users has been created by recreate_db
    response = client.get("/users/")
    assert response.status_code == 200
    assert len(response.json()) == __USERS_IN_DB


def test_post_user(client: TestClient, user: dict):
    response = client.post("/users/", json=user)
    assert response.status_code == 200
    assert response.json()["oid"] == __USERS_IN_DB + 1
    assert response.json()["name"] == user["name"]
    assert response.json()["role"]["oid"] == user["role_id"]


def test_post_user_created(client: TestClient, user: dict):
    response = client.post("/users/", json=user)
    response = client.get("/users/")
    assert response.status_code == 200
    assert len(response.json()) == __USERS_IN_DB + 1


def test_post_user_name_length(client: TestClient, user: dict):
    user["name"] = "s"  # short user name
    response = client.post("/users/", json=user)
    assert response.status_code == 422


def test_update_user(client: TestClient, user: dict):
    changed = {**user, "name": "changed"}
    response = client.put("/users/1", json=changed)
    assert response.status_code == 200
    assert response.json()["name"] == changed["name"]


def test_update_user_404(client: TestClient, user: dict):
    response = client.put("/users/999", json=user)
    assert response.status_code == 404
    assert response.json() == {"detail": "User not found"}


def test_delete_user_deleted(client: TestClient, user):
    response = client.delete("/users/1")
    response = client.get("/users/")
    assert response.status_code == 200
    assert len(response.json()) == __USERS_IN_DB - 1


def test_delete_user_404(client: TestClient):
    response = client.delete("/users/999")
    assert response.status_code == 404
    assert response.json() == {"detail": "User not found"}


def test_fetch_user(client: TestClient, user):
    response = client.get("/users/1")
    assert response.status_code == 200
    assert response.json()["oid"] == 1


def test_change_password(client: TestClient, user):
    data = {"password": "12345678"}
    response = client.put("/users/1/changePassword", json=data)
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_change_password_short(client: TestClient, user):
    data = {"password": "123"}
    response = client.put("/users/1/changePassword", json=data)
    assert response.status_code == 422
    assert response.json() != {"status": "ok"}
