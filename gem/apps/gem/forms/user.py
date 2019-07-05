from pydantic import BaseModel, Schema, validator

from forms.role import RoleOut


class UserIn(BaseModel):
    name: str = Schema(
        "", title="User's name",
        min_length=3, max_length=128
    )
    email: str = ""
    disabled: bool = False
    role_id: int


class UserCreate(UserIn):
    password: str = Schema(
        "",
        title="Password",
        min_length=6, max_length=128
    )

    @validator("password", check_fields=True, always=True)
    def should_be_at_least_6_chars_long(cls, v: str):
        if len(v) < 6:
            raise ValueError("Should be at least 6 characters long")
        return v


class UserOut(BaseModel):
    oid: int = 0
    name: str = ""
    email: str = ""
    disabled: bool = False
    role: RoleOut


class ChangePassword(BaseModel):
    password: str = Schema("", title="Password")

    @validator("password", check_fields=True, always=True)
    def should_be_at_least_6_chars_long(cls, v: str):
        if len(v) < 6:
            raise ValueError("Should be at least 6 characters long")
        return v
