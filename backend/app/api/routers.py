from fastapi import APIRouter

from app.admin import admin_endpoints
from app.admin.admin_urls import AdminURLS
from app.api.endpoints import user_endpoints
from app.api.urls import UserURLS

router = APIRouter()

router.include_router(user_endpoints.router, prefix=UserURLS.base_url, tags=["user"])
router.include_router(admin_endpoints.router, prefix=AdminURLS.base_url, tags=["admin"])
