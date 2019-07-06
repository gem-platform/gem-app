from db.models import Law
from forms.law import LawIn, LawOut


def model2law(model: Law) -> LawOut:
    return LawOut(
        oid=model.id,
        title=model.title,
        content=model.content
    )


def law2model(law: LawIn) -> Law:
    return Law(
        title=law.title,
        content=law.content
    )
