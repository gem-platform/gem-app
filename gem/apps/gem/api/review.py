from datetime import datetime
from pydantic import BaseModel, Schema, validator


class Review(BaseModel):
    oid: int = 0
    title: str = Schema(
        "",
        title="Title",
        min_length=3, max_length=250
    )
    proposal: int
    start: datetime
    end: datetime

    @validator("end")
    def end_should_be_greater_then_start(cls, v: datetime, values):
        if values["start"] > v:
            raise ValueError("End date should be greater than the start date")
        return v
