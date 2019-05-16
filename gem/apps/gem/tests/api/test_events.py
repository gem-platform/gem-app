from datetime import datetime, timedelta, timezone
from starlette.testclient import TestClient

# Test auauthorized access


def test_unauth_read_events(uclient: TestClient):
    response = uclient.get("/events/")
    assert response.status_code == 401
    assert response.json() == {"detail": "Not authenticated"}


def test_unauth_create_event(uclient: TestClient):
    response = uclient.post("/events/")
    assert response.status_code == 401
    assert response.json() == {"detail": "Not authenticated"}


def test_unauth_delete_event(uclient: TestClient):
    response = uclient.delete("/events/0")
    assert response.status_code == 401
    assert response.json() == {"detail": "Not authenticated"}


def test_unauth_update_event(uclient: TestClient):
    response = uclient.put("/events/0")
    assert response.status_code == 401
    assert response.json() == {"detail": "Not authenticated"}


# Test access

def test_read_events(client: TestClient):
    response = client.get("/events/")
    assert response.status_code == 200
    assert response.json() == []


def test_post_event(client: TestClient, event: dict):
    response = client.post("/events/", json=event)
    assert response.status_code == 200
    assert response.json() == {"oid": 1, **event}


def test_post_event_created(client: TestClient, event: dict):
    response = client.post("/events/", json=event)
    response = client.get("/events/")
    assert response.status_code == 200
    assert response.json() == [{"oid": 1, **event}]


def test_post_event_title_length(client: TestClient, event: dict):
    event["title"] = "s"  # short event title
    response = client.post("/events/", json=event)
    assert response.status_code == 422


def test_update_event(client: TestClient, event: dict):
    changed = {**event, "title": "changed"}
    response = client.post("/events/", json=event)
    response = client.put("/events/1", json=changed)
    assert response.status_code == 200
    assert response.json() == {"oid": 1, **changed}


def test_update_event_404(client: TestClient, event: dict):
    response = client.put("/events/999", json=event)
    assert response.status_code == 404
    assert response.json() == {"detail": "Event not found"}


def test_delete_event_deleted(client: TestClient, event):
    response = client.post("/events/", json=event)
    response = client.delete("/events/1")
    response = client.get("/events/")
    assert response.status_code == 200
    assert response.json() == []


def test_delete_event_404(client: TestClient):
    response = client.delete("/events/999")
    assert response.status_code == 404
    assert response.json() == {"detail": "Event not found"}


def test_fetch_event(client: TestClient, event):
    response = client.post("/events/", json=event)
    response = client.get("/events/1")
    assert response.status_code == 200
    assert response.json() == {"oid": 1, **event}


def test_set_wrong_period(client: TestClient, event):
    event["start"] = (datetime.now(tz=timezone.utc) +
                      timedelta(days=1)).isoformat()
    response = client.post("/events/", json=event)
    assert response.status_code == 422
    assert response.json()["detail"][0]["msg"] ==\
        "End date should be greater than the start date"
