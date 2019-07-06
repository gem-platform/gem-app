from db.models import Proposal
from forms.proposal import ProposalIn, ProposalOut


def model2proposal(model: Proposal) -> ProposalOut:
    return ProposalOut(
        oid=model.id,
        title=model.title,
        content=model.content,
        locked=model.locked
    )


def proposal2model(proposal: ProposalIn, model: Proposal = None) -> Proposal:
    result = model if model else Proposal()
    result.title = proposal.title
    result.content = proposal.content
    result.locked = proposal.locked
    return result
