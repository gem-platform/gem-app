from db import models
from api.proposal import Proposal


def map_model_to_proposal(model: models.Proposal) -> Proposal:
    return Proposal(
        oid=model.id,
        title=model.title,
        content=model.content,
        locked=model.locked
    )


def map_proposal_to_model(proposal: Proposal) -> models.Proposal:
    model = models.Proposal(
        title=proposal.title,
        content=proposal.content,
        locked=proposal.locked
    )
    if proposal.oid > 0:
        model.id = proposal.oid
    return model
