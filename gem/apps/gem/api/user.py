from pydantic import BaseModel, Schema
from auth.const import GUEST


class User(BaseModel):
    oid: int = 0
    username: str
    email: str
    password: str = Schema(
        "",
        title="Password",
        min_length=6, max_length=128
    )
    full_name: str = Schema(
        "",
        title="User's full name",
        min_length=3, max_length=64
    )
    disabled: bool = False
    role_id: int = GUEST
