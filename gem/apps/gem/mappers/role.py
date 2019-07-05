from db import models
from forms.role import Role, RoleOut


def model2role(model: models.Role) -> RoleOut:
    return RoleOut(
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
