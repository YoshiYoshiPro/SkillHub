from datetime import datetime

from core.config import get_env
from sqlalchemy import (Column, DateTime, ForeignKey, Integer, LargeBinary,
                        String, Text, create_engine)
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship  # 必要な場合はインポート

# Engine の作成
Engine = create_engine(
    get_env().database_url,
    encoding="utf-8",
    echo=False
)

BaseModel = declarative_base()


# class User(BaseModel):
#    __tablename__ = 'users'

#    id = Column(Integer, primary_key=True)
#    name = Column(String(50), nullable=False)
#    login_id = Column(String(50), unique=True, nullable=False)
#    password = Column(Text, nullable=False)
#    created_at = Column(DateTime, default=datetime.now, nullable=False) # 追加分
#    updated_at = Column(DateTime, default=datetime.now, nullable=False) # 追加分


class Users(BaseModel):
    """
    Usersテーブル
    id : 主キー
    created_at : 登録日時
    """

    __tablename__ = "users"
    id = Column("id", Integer, primary_key=True, autoincrement=True)
    created_at = Column(
        "created_at",
        DateTime,
        default=datetime.now(),
        nullable=False,
    )

class UserActive(BaseModel):
    """
    登録日時テーブル
    user_id    : 外部キー（主キー）
    created_at : 登録日時
    """

    __tablename__ = "user_active"

    user_id = Column("user_id",  Integer, ForeignKey("users.id"), primary_key=True)
    created_at = Column(
        "created_at",
        DateTime,
        default=datetime.now(),
        nullable=False,
    )



class UserLeave(BaseModel):
    """
    退会日時テーブル
    user_id    : 外部キー（主キー）
    created_at : 退会日時
    """

    __tablename__ = "user_leave"

    user_id = Column("user_id",  Integer, ForeignKey("users.id"), primary_key=True)
    created_at = Column(
        "created_at",
        DateTime,
        default=datetime.now(),
        nullable=False,
    )




class UserDetail(BaseModel):
    """
    ユーザ詳細テーブル
    user_id    : 外部キー（主キー）
    name       : ユーザ名
    sns_link   : snsのリンク
    comment    : 一言
    join_date  : 入社日
    department : 所属部署
    icon_image : アイコン画像
    """

    __tablename__ = "user_detail"

    user_id = Column("user_id",  Integer, ForeignKey("users.id"), primary_key=True)
    name = Column("name", String(256))
    sns_link = Column("sns_link", String(256))
    comment = Column("comment", String(256))
    join_date = Column("join_date", DateTime, nullable=False)
    department = Column("department", String(256))
    icon_image = Column("icon_image", LargeBinary)


class Technologies(BaseModel):
    """
    技術テーブル
    id   : 主キー
    name : 技術名
    """

    __tablename__ = "technologies"
    id = Column("id", Integer, primary_key=True, autoincrement=True)
    name = Column("name", String(256))


class UserExperiences(BaseModel):
    """
    ユーザの業務経験テーブル
    id              : 主キー
    user_id         : ユーザ外部キー
    technology_id   : 技術外部キー
    experience_years: 経験年数
    """

    __tablename__ = "user_experiences"
    id = Column("id", Integer, primary_key=True, autoincrement=True)
    user_id = Column("user_id", Integer,  ForeignKey("users.id"))
    technology_id = Column("technology_id", ForeignKey("technologies.id"))
    experience_years = Column("experience_years", Integer)
    user = relationship("UserDetail", backref="experiences")  # 追加



class UserExpertises(BaseModel):
    """
    ユーザの得意な技術テーブル
    id              : 主キー
    user_id         : ユーザ外部キー
    technology_id   : 技術外部キー
    experience_years: 経験年数
    """

    __tablename__ = "user_expertises"
    id = Column("id", Integer, primary_key=True, autoincrement=True)
    user_id = Column("user_id",  Integer, ForeignKey("users.id"))
    technology_id = Column("technology_id", ForeignKey("technologies.id"))
    expertise_years = Column("expertise_years", Integer)
    user = relationship("UserDetail", backref="expertises")  # 追加



class UserInterests(BaseModel):
    """
    ユーザの得意な技術テーブル
    id              : 主キー
    user_id         : ユーザ外部キー
    technology_id   : 技術外部キー
    interest_years: 経験年数
    """

    __tablename__ = "user_interests"
    id = Column("id", Integer, primary_key=True, autoincrement=True)
    user_id = Column("user_id",  Integer, ForeignKey("users.id"))
    technology_id = Column("technology_id", ForeignKey("technologies.id"))
    interest_years = Column("interest_years", Integer)
    user = relationship("UserDetail", backref="interests")



class StudySessions(BaseModel):
    """
    勉強会テーブル
    id           : 主キー
    technology_id: 技術外部キー
    content : 内容
    date         : 開催日時
    created_at   : 投稿された日時
    """

    __tablename__ = "study_sessions"
    id = Column("id", Integer, primary_key=True, autoincrement=True)
    technology_id = Column("technology_id", ForeignKey("technologies.id"))
    content = Column("content", String(256))
    date = Column("date", DateTime, nullable=False)
    created_at = Column(
        "created_at",
        DateTime,
        default=datetime.now(),
        nullable=False,
    )


class Likes(BaseModel):
    """
    いいねテーブル
    id               : 主キー
    user_id          : ユーザ外部キー
    study_session_id : 勉強会外部キー
    """

    __tablename__ = "likes"
    id = Column("id", Integer, primary_key=True, autoincrement=True)
    user_id = Column("user_id", Integer,  ForeignKey("users.id"))
    study_session_id = Column("study_session_id", ForeignKey("study_sessions.id"))
