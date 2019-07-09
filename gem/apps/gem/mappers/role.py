from db.models import Role
from forms.role import RoleIn, RoleOut


def model2role(model: Role) -> RoleOut:
    return RoleOut(
        oid=model.id,
        name=model.name
    )


def role2model(role: RoleIn, model: Role = None) -> Role:
    result = model if model else Role()
    result.name = role.name
    return result
