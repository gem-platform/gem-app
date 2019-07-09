from db.models import Event, Proposal
from forms.event import EventIn, EventOut


def event2model(event: EventIn, session) -> Event:
    model = Event(
        type=event.type,
        title=event.title,
        agenda=event.agenda,
        start=event.start,
        end=event.end
    )

    # add proposals to an event
    proposals = session.query(Proposal).filter(
        Proposal.id.in_(event.proposals)).all()
    model.proposals.extend(proposals)

    return model


def model2event(model: Event) -> EventOut:
    return EventOut(
        oid=model.id,
        type=model.type,
        title=model.title,
        agenda=model.agenda,
        start=model.start,
        end=model.end,
        proposals=list(map(lambda x: x.id, model.proposals))
    )
