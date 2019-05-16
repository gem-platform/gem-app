from db import models
from api.event import Event


def event2model(event: Event, session) -> models.Event:
    model = models.Event(
        type=event.type,
        title=event.title,
        agenda=event.agenda,
        start=event.start,
        end=event.end
    )

    # add proposals to an event
    proposals = session.query(models.Proposal).filter(
        models.Proposal.id.in_(event.proposals)).all()
    model.proposals.extend(proposals)

    if event.oid > 0:
        model.id = event.oid
    return model


def model2event(model: models.Event) -> Event:
    return Event(
        oid=model.id,
        type=model.type,
        title=model.title,
        agenda=model.agenda,
        start=model.start,
        end=model.end,
        proposals=list(map(lambda x: x.id, model.proposals))
    )
