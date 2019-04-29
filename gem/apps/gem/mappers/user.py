from db import models
from api.user import User


def map_model_to_user(model: models.User) -> User:
    user = User(
        oid=model.id,
        username=model.username,
        full_name=model.full_name,
        email=model.email,
        disabled=model.disabled,
        password=model.hashed_password
    )
    return user


def map_user_to_model(user: User) -> models.User:
    model = models.User(
        username=user.username,
        full_name=user.full_name,
        email=user.email,
        disabled=user.disabled
    )
    if user.oid > 0:
        model.id = user.oid
    return model
