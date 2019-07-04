from pydantic import BaseModel, Schema


class Law(BaseModel):
    oid: int = 0
    title: str = Schema(
        "",
        title="Title",
        min_length=3, max_length=250
    )
    content: str = Schema(
        "",
        title="Content"
    )
