from pydantic import BaseModel, Schema


class Law(BaseModel):
    title: str = Schema(
        "",
        title="Title",
        min_length=3, max_length=250
    )
    content: str = Schema(
        "",
        title="Content"
    )


class LawIn(Law):
    pass


class LawOut(Law):
    oid: int = 0
