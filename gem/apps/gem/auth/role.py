from typing import List, Set

from fastapi import Depends
from routes import auth
from db.models import User

# Checking user role
class RoleChecker:
    def __init__(self, role: int, permissions=["all"]):
        self.role = role
        self.permissions = permissions

    def __call__(self, user: User = Depends(auth.get_current_active_user)):
        if user.role.rid == self.role:
            return True
        return False
