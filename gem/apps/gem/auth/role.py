from fastapi import Depends
from routes import auth
from db.models import User
from auth.const import ADMIN
from starlette.exceptions import HTTPException
from starlette.status import HTTP_403_FORBIDDEN, HTTP_404_NOT_FOUND

'''
Checking user role & permissions
'''


class RoleChecker:
    def __init__(self, role=None, permissions=None):
        self.role = [] if role is None else role
        self.permissions = ["all"] if permissions is None else permissions

    def __call__(self, user: User = Depends(auth.get_current_active_user)):
        self.check_role(user)
        permissions = user.role.permissions
        if self.is_super_user(user.role.rid, permissions):
            return True
        self.check_permissions(permissions)
        return True

    def is_super_user(self, role, permissions):
        return 'all' in permissions and permissions['all'] == 1 and role == ADMIN

    def check_role(self, user: User):
        if user.role.rid not in self.role:
            # Temporary set 404 as on 403 it log out
            raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail="Access Denied")

    def check_permissions(self, permissions):
        """
        Checking permission. If a user has permissions we allow action
        :param permissions:
        """
        for permission_name in self.permissions:
            if permission_name == 'all':
                continue
            if permission_name not in permissions \
                    or (permission_name in permissions and permissions[permission_name] == 0):
                # Temporary set 404 as on 403 it log out
                raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail="Not enough permissions")
