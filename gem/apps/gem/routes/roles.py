from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from auth.role import AuthenticatedUser
from db import get_db
from db.models import Role, User
from mappers.role import model2role

router = APIRouter()
user_with_roles_access = AuthenticatedUser(permissions=["user_list"])


@router.get("/")
async def fetch_roles_list(
        current_user: User = Depends(user_with_roles_access),
        session: Session = Depends(get_db)):
    roles = session.query(Role).all()  # type: [Role]
    return list(map(model2role, roles))
