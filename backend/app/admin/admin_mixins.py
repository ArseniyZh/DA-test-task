import warnings
from typing import Optional, Dict, Union, List

from fastapi import Depends
from sqlalchemy import Column, select, delete
from sqlalchemy import func
from sqlalchemy.exc import SAWarning
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.base import Base
from app.db.session import get_db

warnings.simplefilter('ignore', category=SAWarning)


class EnumTypes:
    DATETIME: str = "DATETIME"
    INTEGER: str = "INTEGER"
    VARCHAR: str = "VARCHAR"


class SubAdminClasses:
    def __init__(self, _classes: Optional[dict] = None):
        self.classes: dict = _classes if _classes is not None else dict()

    def add_class(self, _class):
        self.classes[_class.__name__] = _class

    def get_classes(self):
        return self.classes

    def get_class(self, class_name):
        return self.classes.get(class_name)


sub_admin_classes = SubAdminClasses()


class AdminModelMixin:
    def __init_subclass__(cls, **kwargs):
        cls.fields: Dict[str, Dict[str, Union[EnumTypes, bool]]] = {}
        cls.model_name: str = cls.__name__
        cls.model = cls
        sub_admin_classes.add_class(cls)

        try:
            implemented_fields = set(kwargs.get("admin_fields", set()))
        except Exception:
            raise Exception("Параметр admin_fields должен быть множеством.")

        for field in dir(cls):
            _field = getattr(cls, field, None)
            if isinstance(_field, Column):
                cls.fields[field] = dict(
                    type=str(_field.type),
                    required=not _field.nullable,
                    declarative=True if field in Base.__annotations__ else False
                )

        if not_implemented_fields := implemented_fields - set(cls.fields):
            raise ValueError(f"Таких полей нет в модели: {not_implemented_fields}.")
        elif implemented_fields:
            cls.fields = [field for field in cls.fields if field in implemented_fields]


async def get_all_list_models_data(
        db: AsyncSession = Depends(get_db)
) -> List[Dict[str, Union[str, int]]]:
    result_list = []
    models = sub_admin_classes.get_classes()

    for name, _class in models.items():
        count = (await db.execute(select(func.count()).select_from(sub_admin_classes.get_class(name)))).scalar()
        result_list.append({
            "title": name,
            "count": count
        })

    return result_list


async def create_admin_model(
        model_name: str, body: dict, db: AsyncSession = Depends(get_db)
):
    model = sub_admin_classes.get_class(model_name)

    db_model = model(**body)
    db.add(db_model)
    await db.commit()
    await db.refresh(db_model)

    return db_model


async def list_admin_model(
        model_name: str, db: AsyncSession = Depends(get_db)
) -> Dict[str, Union[Dict[str, Dict[str, Union[EnumTypes, bool]]], List[Dict]]]:
    model = sub_admin_classes.get_class(model_name)
    fields = model.fields

    query = select(model).order_by(model.created_at)
    result = await db.execute(query)
    db_model_list = result.fetchall()

    models_list = [
        _model[model_name] for _model in db_model_list
    ]
    result = {
        "fields": fields,
        "models": models_list
    }

    return result


async def edit_admin_model(
        model_name: str, model_id: int, body: dict, db: AsyncSession = Depends(get_db)
):
    db_model = await get_admin_model_by_id(model_name, model_id, db)
    if db_model:
        for key, value in body.items():
            if hasattr(db_model.__class__, key) and key not in Base.__annotations__:
                setattr(db_model, key, value)
        await db.commit()
        await db.refresh(db_model)
    return db_model


async def delete_admin_model(
        model_name: str, model_id: int, db: AsyncSession = Depends(get_db)
):
    model = sub_admin_classes.get_class(model_name)

    query = delete(model).filter(model.id == model_id)
    await db.execute(query)
    await db.commit()
    return


async def get_admin_model_by_id(
        model_name: str, model_id, db: AsyncSession = Depends(get_db)
):
    model = sub_admin_classes.get_class(model_name)

    query = select(model).filter(model.id == model_id)
    return (await db.execute(query)).scalar()
