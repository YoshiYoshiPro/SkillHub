from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

# PostgreSQL 接続情報
DATABASE = "your_database_name"  # 適切な値に変更が必要
USER = "your_username"  # 適切な値に変更が必要
PASSWORD = "your_password"  # 適切な値に変更が必要
HOST = "localhost"  # もしリモートホストに接続する場合は、この値を変更してください
PORT = "5432"
RDB_PATH = f"postgresql://{USER}:{PASSWORD}@{HOST}:{PORT}/{DATABASE}"

ECHO_LOG = True

engine = create_engine(RDB_PATH, echo=ECHO_LOG)

Session = sessionmaker(bind=engine)
session = Session()
