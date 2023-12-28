from typing import Dict, Union, List

from fastapi import Depends, APIRouter, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.admin.admin_mixins import (
    get_all_list_models_data,
    create_admin_model,
    list_admin_model,
    edit_admin_model,
    delete_admin_model,
)
from app.admin.admin_urls import AdminURLS
from app.core.security import get_current_user
from app.db.session import get_db
from app.models.user_models import User

router = APIRouter()


@router.get(AdminURLS.all_list_names_url, status_code=status.HTTP_200_OK)
async def all_list_names_endpoint(
        current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)
) -> List[Dict[str, Union[str, int]]]:
    return await get_all_list_models_data(db)


@router.post(AdminURLS.create_url, status_code=status.HTTP_201_CREATED)
async def create_admin_model_endpoint(
        model_name: str, body: dict,
        current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)
) -> dict:
    user_id = body.get("user_id", "").replace(" ", "")
    if user_id is not None:
        body["user_id"] = int(user_id) if user_id else current_user.id
    await create_admin_model(model_name, body, db)
    return {}


@router.get(AdminURLS.list_url, status_code=status.HTTP_200_OK)
async def list_admin_model_endpoint(
        model_name: str,
        current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)
) -> Dict[str, Union[Dict, List]]:
    db_model_list = await list_admin_model(model_name, db)
    return db_model_list


@router.patch(AdminURLS.edit_url, status_code=status.HTTP_200_OK)
async def edit_admin_model_endpoint(
        model_name: str, model_id: int, body: dict,
        current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)
) -> dict:
    await edit_admin_model(model_name, model_id, body, db)
    return {}


@router.delete(AdminURLS.delete_url, status_code=status.HTTP_200_OK)
async def delete_admin_model_endpoint(
        model_name: str, model_id: int,
        current_user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)
) -> dict:
    await delete_admin_model(model_name, model_id, db)
    return {}
