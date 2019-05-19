from fastapi import APIRouter, Depends
from db import models, get_db
from mappers.role import model2role, role2model
from auth.role import RoleChecker
from sqlalchemy.orm import Session

router = APIRouter()


@router.get("/")
async def fetch_roles_list(
        is_permitted: bool = Depends(RoleChecker(permissions=["user_list"])),
        s: Session = Depends(get_db)):
    roles = s.query(models.Role).all()  # type: [models.Role]
    return list(map(model2role, roles))

