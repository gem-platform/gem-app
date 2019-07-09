from pydantic import BaseModel, Schema


class Role(BaseModel):
    name: str = Schema(
        "", title="Name of the role",
        min_length=3, max_length=24
    )


class RoleIn(Role):
    pass


class RoleOut(Role):
    oid: int = 0
