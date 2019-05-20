from pydantic import BaseModel, Schema


class Role(BaseModel):
    oid: int = 0
    name: str = Schema(
        "", title="Name of the role",
        min_length=3, max_length=24
    )


class RoleOut(BaseModel):
    oid: int = 0
    name: str = ""
