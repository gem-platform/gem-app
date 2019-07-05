from db.models import Proposal
from forms.proposal import ProposalForm


def map_model_to_proposal(model: Proposal) -> ProposalForm:
    return ProposalForm(
        oid=model.id,
        title=model.title,
        content=model.content,
        locked=model.locked
    )


def map_proposal_to_model(proposal: ProposalForm) -> Proposal:
    model = Proposal(
        title=proposal.title,
        content=proposal.content,
        locked=proposal.locked
    )
    if proposal.oid > 0:
        model.id = proposal.oid
    return model
