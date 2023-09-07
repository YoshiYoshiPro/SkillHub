

from ast import List, Tuple

import uvicorn
from sqlalchemy.orm import Session
from starlette.middleware.cors import CORSMiddleware
from starlette.requests import Request

from core.database import get_db  # ここでget_db関数をインポート
from crud import crud
from fastapi import APIRouter, Depends, FastAPI, HTTPException
from migration import models
from schemas import schemas

'''from core import config
from crud import crud'''
from fastapi import Depends, FastAPI, HTTPException

# from migration import database, models

app = FastAPI(title="社内勉強会の開催を活発にするwebアプリ", description="社内の勉強会の予定を共有するWebアプリケーション")


router = APIRouter()

# CORS対応 (https://qiita.com/satto_sann/items/0e1f5dbbe62efc612a78)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def index(request: Request):
    return {"Hello": "World"}


def get_data(request: Request):
    return {"key": "value", "message": "Hello from FastAPI!"}


def get_tag_result(request: Request, tag):
    return {
        "is_accepted": True,
        "interests": [
            {
                "user_id": tag,
                "name": tag,
                "icon_url": "http://localhost:3000/logo192.png",
            },
            {
                "user_id": "bbb",
                "name": "いいい",
                "icon_url": "http://localhost:3000/logo192.png",
            },
            {
                "user_id": "ccc",
                "name": "ううう",
                "icon_url": "http://localhost:3000/logo192.png",
            },
        ],
        "expertises": [
            {
                "user_id": "ccc",
                "name": "ううう",
                "icon_url": "http://localhost:3000/logo192.png",
                "years": 8,
            },
            {
                "user_id": "ddd",
                "name": "えええ",
                "icon_url": "http://localhost:3000/logo192.png",
                "years": 13,
            },
        ],
        "experiences": [
            {
                "user_id": "aaa",
                "name": "あああ",
                "icon_url": "http://localhost:3000/logo192.png",
                "years": 1,
            },
            {
                "user_id": "bbb",
                "name": "いいい",
                "icon_url": "http://localhost:3000/logo192.png",
                "years": 2,
            },
            {
                "user_id": "ccc",
                "name": "ううう",
                "icon_url": "http://localhost:3000/logo192.png",
                "years": 8,
            },
            {
                "user_id": "ddd",
                "name": "えええ",
                "icon_url": "http://localhost:3000/logo192.png",
                "years": 13,
            },
            {
                "user_id": "eee",
                "name": "おおお",
                "icon_url": "http://localhost:3000/logo192.png",
                "years": 5,
            },
        ],
    }


def get_suggested_tags(request: Request, tag_substring):
    tmp_tags = ["Java", "JavaScript", "SolidJS", "Three.JS", "Golang"]

    return {
    	"suggested_tags": [tag for tag in tmp_tags if tag_substring in tag],
    }

def get_user_by_id(request: Request, user_id: int):
    # データベースセッションを取得
    db = request.state.db

    # ユーザーをデータベースから取得
    user = db.query(models.Users).filter(models.Users.id == user_id).first()

    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    return user


def create_user(user: schemas.UsersCreate, db: Session = Depends(get_db)):
    return crud.create_user(db, user)


def get_all_users(db: Session = Depends(get_db)):
    users = crud.get_all_users(db)  # データベース操作関数を呼び出してデータを取得
    return users

def get_user_profile(user_id: int, db: Session = Depends(get_db)):
    user = crud.get_user_profile(db, user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    # プロフィール情報を要求されたフォーマットに整形
    profile_data = {
        "name": user.name,
        "sns_link": user.sns_link,
        "comment": user.comment,
        "join_date": str(user.join_date),
        "department": user.department,
        "interests": [{"name": interest.name} for interest in user.interests],
        "expertises": [{"name": expertise.name, "years": expertise.expertise_years} for expertise in user.expertises],
        "experiences": [{"name": experience.name, "years": experience.experience_years} for experience in user.experiences],
    }
    return profile_data

def update_user_profile(
    user_id: int,
    edited_sns_link: str,
    edited_comment: str,
    edited_join_date: str,
    edited_department: str,
    edited_interests: list[int],
    edited_expertises: List[Tuple[int, int]],
    edited_experiences: List[Tuple[int, int]],
    db: Session = Depends(get_db)
):
    user_profile = crud.get_user_profile(db,user_id)
    if user_profile is None:
        raise HTTPException(status_code=404, detail="User not found")
    user_profile.sns_link = edited_sns_link
    user_profile.comment = edited_comment
    user_profile.join_date = edited_join_date
    user_profile.department = edited_department

    # 興味を更新
    # まず、指定された user_id に関連する現在の user_interests レコードを削除
    db.query(models.UserInterests).filter(models.UserInterests.user_id == user_id).delete()

    db.query(models.UserExpertises).filter(models.UserExpertises.user_id == user_id).delete()

    db.query(models.UserExperiences).filter(models.UserExperiences.user_id == user_id).delete()

    # 興味を更新
    for interest_id in edited_interests:
        user_interest = models.UserInterests(
            user_id=user_id,
            technology_id=interest_id,
            interest_years=1,  # 適切な値を設定してください
        )
        db.add(user_interest)

    # 専門性を更新
    for expertise in edited_expertises:
        technology_id, expertise_years = expertise
        user_expertise = models.UserExpertises(
            user_id=user_id,
            technology_id=technology_id,
            expertise_years=expertise_years,
        )
        db.add(user_expertise)


    # 経験を更新
    for experience in edited_experiences:
        technology_id, experience_years = experience
        user_experience = models.UserExpertises(
            user_id=user_id,
            technology_id=technology_id,
            experience_years=experience_years,
        )
        db.add(user_experience)

    db.commit()

    return{"is_accepted":True}
