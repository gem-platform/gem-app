from typing import List, Set

from fastapi import Depends
from routes import auth
from db import session_scope, models, User

class RoleChecker:
    def __init__(self, role: int, permissions=["all"]):
        self.role = role
        self.permissions = permissions

    def __call__(self, user : User = Depends(auth.get_current_active_user)):
        with session_scope() as s:
            role = s.query(models.Role).filter_by(id=user.role_id).first()  # type: models.Role
            if role.id == self.role:
                return True
        return False
