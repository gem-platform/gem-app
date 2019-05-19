from pydantic import BaseModel, Schema


class User(BaseModel):
    oid: int = 0
    name: str = Schema(
        "", title="User's name",
        min_length=3, max_length=128
    )
    email: str = ""
    password: str = Schema(
        "",
        title="Password",
        min_length=6, max_length=128
    )
    disabled: bool = False
    role_id: int = 0
