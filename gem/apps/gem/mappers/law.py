from db import models
from forms.law import LawForm


def map_model_to_law(model: models.Law) -> LawForm:
    return LawForm(
        oid=model.id,
        title=model.title,
        content=model.content
    )


def map_law_to_model(law: LawForm) -> models.Law:
    model = models.Law(
        title=law.title,
        content=law.content
    )
    if law.oid > 0:
        model.id = law.oid
    return model
