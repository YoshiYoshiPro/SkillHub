from datetime import datetime

from sqlalchemy import (
    Base,
    Column,
    DateTime,
    ForeignKey,
    Integer,
    LargeBinary,
    String,
    func,
)


class Users(Base):
    """
    Usersテーブル
    id : 主キー
    """

    __tablename__ = "users"
    id = Column("id", Integer, primary_key=True, autoincrement=True)


class UserAuth(Base):
    """
    User認証テーブル
    id           : 主キー
    user_id      : ユーザキー（外部キー）
    identity_type: ログインの種類
    identifier   : ログインの内容
    credential   : トークン
    """

    __tablename__ = "user_auth"

    id = Column("id", Integer, primary_key=True, autoincrement=True)
    user_id = Column("user_id", ForeignKey("users.id"), nullable=False)
    identity_type = Column("identity_type", String(50), nullable=False)
    identifier = Column("identifier", String(256), nullable=False)
    credential = Column("credential", String(256), nullable=False)

    def __str__(self):
        return f"id: {self.id}, user_id: {self.user_id}, identity_type: {self.identity_type}, identifier: {self.identifier}"


class UserActive(Base):
    """
    登録日時テーブル
    user_id    : 外部キー（主キー）
    created_at : 登録日時
    """

    __tablename__ = "user_active"

    user_id = Column("user_id", ForeignKey("users.id"), primary_key=True)
    created_at = Column(
        "created_at",
        DateTime,
        default=datetime.now(),
        nullable=False,
        server_default=current_timestamp(),
    )

    def __str__(self):
        return f'{self.user_id}: user_id -> {self.user_id}, created_at -> {self.created_at.strftime("%Y/%m/%d - %H:%M:%S")}'


class UserLeave(Base):
    """
    退会日時テーブル
    user_id    : 外部キー（主キー）
    created_at : 退会日時
    """

    __tablename__ = "user_leave"

    user_id = Column("user_id", ForeignKey("users.id"), primary_key=True)
    created_at = Column(
        "created_at",
        DateTime,
        default=datetime.now(),
        nullable=False,
        server_default=current_timestamp(),
    )

    def __str__(self):
        return f'{self.user_id}: user_id -> {self.user_id}, created_at -> {self.created_at.strftime("%Y/%m/%d - %H:%M:%S")}'


class UserDetail(Base):
    """
    ユーザ詳細テーブル
    user_id    : 外部キー（主キー）
    name       : ユーザ名
    email      : メールアドレス
    sns_link   : snsのリンク
    comment    : 一言
    join_date  : 入社日
    department : 所属部署
    icon_image : アイコン画像
    """

    __tablename__ = "user_detail"

    user_id = Column("user_id", ForeignKey("users.id"), primary_key=True)
    name = Column("name", String(256))
    email = Column("email", String(256))
    sns_link = Column("sns_link", String(256))
    comment = Column("comment", String(256))
    join_date = Column("join_date", DateTime, nullable=False)
    department = Column("department", String(256))
    icon_image = Column("icon_image", LargeBinary)

    def __str__(self):
        return f'user_id: {self.user_id}, name: {self.name}, email: {self.email}, join_date: {self.join_date.strftime("%Y/%m/%d - %H:%M:%S")}, department: {self.department}'


class Technologies(Base):
    """
    技術テーブル
    id   : 主キー
    name : 技術名
    """

    __tablename__ = "technologies"
    id = Column("id", Integer, primary_key=True, autoincrement=True)
    name = Column("name", String(256))


class UserExperiences(Base):
    """
    ユーザの業務経験テーブル
    id              : 主キー
    user_id         : ユーザ外部キー
    technology_id   : 技術外部キー
    experience_years: 経験年数
    """

    __tablename__ = "user_experiences"
    id = Column("id", Integer, primary_key=True, autoincrement=True)
    user_id = Column("user_id", ForeignKey("users.id"))
    technology_id = Column("technology_id", ForeignKey("technologies.id"))
    experience_years = Column("experience_years", INTEGER)

    def __str__(self):
        return f"id: {self.id}, user_id: {self.user_id}, technology_id: {self.technology_id}, experience_years: {self.experience_years}"


class UserExpertises(Base):
    """
    ユーザの得意な技術テーブル
    id              : 主キー
    user_id         : ユーザ外部キー
    technology_id   : 技術外部キー
    experience_years: 経験年数
    """

    __tablename__ = "user_expertises"
    id = Column("id", Integer, primary_key=True, autoincrement=True)
    user_id = Column("user_id", ForeignKey("users.id"))
    technology_id = Column("technology_id", ForeignKey("technologies.id"))
    expertise_years = Column("expertise_years", INTEGER)

    def __str__(self):
        return f"id: {self.id}, user_id: {self.user_id}, technology_id: {self.technology_id}, expertise_years: {self.expertise_years}"


class UserInterests(Base):
    """
    ユーザの得意な技術テーブル
    id              : 主キー
    user_id         : ユーザ外部キー
    technology_id   : 技術外部キー
    interest_years: 経験年数
    """

    __tablename__ = "user_interests"
    id = Column("id", Integer, primary_key=True, autoincrement=True)
    user_id = Column("user_id", ForeignKey("users.id"))
    technology_id = Column("technology_id", ForeignKey("technologies.id"))
    interest_years = Column("interest_years", INTEGER)

    def __str__(self):
        return f"id: {self.id}, user_id: {self.user_id}, technology_id: {self.technology_id}, experience_years: {self.interest_years}"


class StudySessions(Base):
    """
    勉強会テーブル
    id           : 主キー
    technology_id: 技術外部キー
    date         : 開催日時
    created_at   : 投稿された日時
    """

    __tablename__ = "study_sessions"
    id = Column("id", Integer, primary_key=True, autoincrement=True)
    technology_id = Column("technology_id", ForeignKey("technologies.id"))
    date = Column("date", DateTime, nullable=False)
    created_at = Column(
        "created_at",
        DateTime,
        default=datetime.now(),
        nullable=False,
        server_default=current_timestamp(),
    )

    def __str__(self):
        return f'id: {self.id}, technology_id: {self.technology_id}, date: {self.date.strftime("%Y/%m/%d - %H:%M:%S")}, created_at: {self.created_at.strftime("%Y/%m/%d - %H:%M:%S")}'


class Likes(Base):
    """
    いいねテーブル
    id               : 主キー
    user_id          : ユーザ外部キー
    study_session_id : 勉強会外部キー
    """

    __tablename__ = "likes"
    id = Column("id", Integer, primary_key=True, autoincrement=True)
    user_id = Column("user_id", ForeignKey("users.id"))
    study_session_id = Column("study_session_id", ForeignKey("study_sessions.id"))

    def __str__(self):
        return f"id: {self.id}, user_id: {self.user_id}, study_session_id: {self.study_session_id}"
