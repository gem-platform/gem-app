from pydantic import BaseModel, Schema


class Proposal(BaseModel):
    title: str = Schema(
        "",
        title="Title",
        min_length=3, max_length=250
    )
    content: str = Schema(
        "",
        title="Content"
    )
    locked: bool = Schema(
        False,
        title="Is proposal locked for modification?")


class ProposalIn(Proposal):
    pass


class ProposalOut(Proposal):
    oid: int = 0
