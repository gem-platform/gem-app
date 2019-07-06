from db.models import Law
from forms.law import LawIn, LawOut


def map_model_to_law(model: Law) -> LawOut:
    return LawOut(
        oid=model.id,
        title=model.title,
        content=model.content
    )


def map_law_to_model(law: LawIn) -> Law:
    return Law(
        title=law.title,
        content=law.content
    )
