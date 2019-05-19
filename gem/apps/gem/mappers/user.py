from db import models
from api.user import User


def map_model_to_user(model: models.User) -> User:
    user = User(
        oid=model.id,
        name=model.name,
        full_name=model.full_name,
        email=model.email,
        disabled=model.disabled,
        role_id=model.role_id
    )
    return user


def map_user_to_model(user: User) -> models.User:
    model = models.User(
        name=user.name,
        email=user.email,
        disabled=user.disabled,
        role_id=user.role_id
    )
    if user.oid > 0:
        model.id = user.oid
    return model
