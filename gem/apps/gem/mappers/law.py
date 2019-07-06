from db.models import Law
from forms.law import LawIn, LawOut


def model2law(model: Law) -> LawOut:
    return LawOut(
        oid=model.id,
        title=model.title,
        content=model.content
    )


def law2model(law: LawIn, model: Law = None) -> Law:
    result = model if model else Law()
    result.title = law.title
    result.content = law.content
    return result
