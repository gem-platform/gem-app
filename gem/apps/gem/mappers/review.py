from db import models
from api.review import Review


def map_model_to_review(model: models.Review) -> Review:
    return Review(
        oid=model.id,
        title=model.title,
        proposal=model.proposal_id,
        start=model.start,
        end=model.end
    )


def map_review_to_model(review: Review) -> models.Review:
    model = models.Review(
        title=review.title,
        proposal_id=review.proposal,
        start=review.start,
        end=review.end
    )
    if review.oid > 0:
        model.id = review.oid
    return model
