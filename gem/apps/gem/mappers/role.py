from db import models
from api.role import Role


def model2role(model: models.Role) -> Role:
    return Role(
        oid=model.id,
        name=model.name
    )


def role2model(role: Role) -> models.Role:
    model = models.Role(
        name=role.name,
    )
    if role.oid > 0:
        model.id = role.oid
    return model
