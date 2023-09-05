from datetime import datetime

from core.config import get_env
from sqlalchemy import Column, DateTime, Integer, String, Text, create_engine
from sqlalchemy.ext.declarative import declarative_base

# Engine の作成
Engine = create_engine(
    get_env().database_url,
    encoding="utf-8",
    echo=False
)

BaseModel = declarative_base()


class User(BaseModel):
   __tablename__ = 'users'

   id = Column(Integer, primary_key=True)
   name = Column(String(50), nullable=False)
   login_id = Column(String(50), unique=True, nullable=False)
   password = Column(Text, nullable=False)
   created_at = Column(DateTime, default=datetime.now, nullable=False) # 追加分
   updated_at = Column(DateTime, default=datetime.now, nullable=False) # 追加分
