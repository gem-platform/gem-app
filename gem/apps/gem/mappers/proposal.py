from db.models import Proposal
from forms.proposal import ProposalIn, ProposalOut


def map_model_to_proposal(model: Proposal) -> ProposalOut:
    return ProposalOut(
        oid=model.id,
        title=model.title,
        content=model.content,
        locked=model.locked
    )


def map_proposal_to_model(proposal: ProposalIn) -> Proposal:
    return Proposal(
        title=proposal.title,
        content=proposal.content,
        locked=proposal.locked
    )
