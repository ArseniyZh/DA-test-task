import typing

from fastapi import Depends
from sqlalchemy import Column, Integer, String, ForeignKey, select, delete
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import relationship

from app.db.base import Base
from app.db.session import get_db
from app.schemas.base import Schema

from app.admin.admin_mixins import AdminModelMixin


class Desk(Base, AdminModelMixin):
    __tablename__ = "desk"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"), nullable=False)
    title = Column(String, index=True, nullable=False)

    user = relationship("User", back_populates="desks")
