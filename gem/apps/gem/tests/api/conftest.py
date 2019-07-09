from datetime import datetime, timezone
from starlette.testclient import TestClient
from pytest import fixture
from main import app


def __client(auth: bool = True, seed: bool = True) -> TestClient:
    client = TestClient(app)
    credentials = {"username": "Secretary", "password": "secret"}

    client.post("/debug/wipeout" + "?seed=true" if seed else "")

    if auth:
        response = client.post("/auth/token", credentials)
        access_token = response.json()["access_token"]
        client.headers["Authorization"] = "Bearer " + access_token

    return client


@fixture
def uclient() -> TestClient:
    return __client(False, True)


@fixture
def client() -> TestClient:
    return __client(True, True)


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


@fixture
def user() -> dict:
    return {
        "name": "Krishna das",
        "password": "password123456",
        "email": "krishna.das@gmail.com",
        "disabled": False,
        "role_id": 1
    }
