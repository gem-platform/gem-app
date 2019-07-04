from db import models
from api.law import Law


def map_model_to_law(model: models.Law) -> Law:
    return Law(
        oid=model.id,
        title=model.title,
        content=model.content
    )


def map_law_to_model(law: Law) -> models.Law:
    model = models.Law(
        title=law.title,
        content=law.content
    )
    if law.oid > 0:
        model.id = law.oid
    return model
