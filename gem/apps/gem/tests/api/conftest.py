from datetime import datetime, timezone
from starlette.testclient import TestClient
from pytest import fixture
from main import app


@fixture
def uclient() -> TestClient:
    client = TestClient(app)
    client.post("/debug/wipeout")
    return client


@fixture
def client(uclient: TestClient) -> TestClient:
    res = uclient.post(
        "/auth/token",
        {"username": "Secretary", "password": "secret"})
    access_token = res.json()["access_token"]
    uclient.headers["Authorization"] = "Bearer " + access_token
    return uclient


@fixture
def proposal() -> dict:
    return {
        "title": "new proposal",
        "content": "content",
        "locked": False
    }


@fixture
def event() -> dict:
    return {
        "title": "new event",
        "agenda": "agenda",
        "type": "event",
        "start": datetime.now(tz=timezone.utc).isoformat(),
        "end": datetime.now(tz=timezone.utc).isoformat(),
        "proposals": []
    }


@fixture
def law() -> dict:
    return {
        "title": "new law",
        "content": "content"
    }
