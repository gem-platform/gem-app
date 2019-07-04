from db import models
from api.event import Event


def event2model(event: Event, session, model: models.Event = None) -> models.Event:
    result = model if model else models.Event()
    result.type = event.type
    result.title = event.title
    result.agenda = event.agenda
    result.start = event.start
    result.end = event.end
    
    # add proposals to an event
    proposals = session.query(models.Proposal).filter(
        models.Proposal.id.in_(event.proposals)).all()
    result.proposals.extend(proposals)

    if event.oid > 0:
        result.id = event.oid
    return result


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
