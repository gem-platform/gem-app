from datetime import datetime
from enum import Enum
from typing import List

from pydantic import BaseModel, Schema, validator


class EventType(str, Enum):
    event = "event"
    meeting = "meeting"
    review = "review"


class Event(BaseModel):
    type: EventType
    title: str = Schema(
        "",
        title="Title",
        min_length=3, max_length=250
    )
    agenda: str = ""
    start: datetime
    end: datetime
    proposals: List[int] = []

    @validator("end")
    def end_should_be_greater_then_start(cls, v: datetime, values):
        if values["start"] > v:
            raise ValueError("End date should be greater than the start date")
        return v


class EventIn(Event):
    pass


class EventOut(Event):
    oid: int = 0
