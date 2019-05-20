from fastapi import Depends
from routes import auth
from db.models import User
from starlette.exceptions import HTTPException
from starlette.status import HTTP_403_FORBIDDEN


class AuthenticatedUser:
    """
    Checking user role & permissions
    """

    def __init__(self, permissions=None):
        self.permissions = ["all"] if permissions is None else permissions

    def __call__(self, user: User = Depends(auth.get_current_active_user)):
        permissions = user.role.permissions
        if self.is_super_user(permissions):
            return user
        self.check_permissions(permissions)
        return user

    def is_super_user(self, permissions):
        return "all" in permissions and permissions["all"] == 1

    def check_permissions(self, permissions):
        """
        Checking permission. If a user has permissions we allow action
        :param permissions:
        """
        for permission_name in self.permissions:
            if permission_name == "all":
                continue
            if permission_name not in permissions \
                    or (permission_name in permissions and permissions[permission_name] == 0):
                raise HTTPException(
                    status_code=HTTP_403_FORBIDDEN, detail="Not enough permissions")
