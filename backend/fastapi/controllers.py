import firebase_admin

from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from firebase_admin import auth, credentials
from pydantic import BaseModel

"""from core import config
from crud import crud"""


from typing import List

import uvicorn
from sqlalchemy.orm import Session
from starlette.middleware.cors import CORSMiddleware
from starlette.requests import Request

from core.database import get_db  # ここでget_db関数をインポート
from crud import crud
from fastapi import APIRouter, Depends, FastAPI, HTTPException, status
from migration import models
from schemas import schemas


# from migration import database, models

app = FastAPI(title="社内勉強会の開催を活発にするwebアプリ", description="社内の勉強会の予定を共有するWebアプリケーション")

# Firebaseの初期化
cred = credentials.Certificate("./serviceAccountKey.json")
firebase_admin.initialize_app(cred)

router = APIRouter()

# CORS対応 (https://qiita.com/satto_sann/items/0e1f5dbbe62efc612a78)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# リクエストボディの定義
class Message(BaseModel):
    name: str


# Bearer認証関数の定義
def get_current_user(cred: HTTPAuthorizationCredentials = Depends(HTTPBearer())):
    if not cred:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    try:
        cred = auth.verify_id_token(cred.credentials)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return cred


# getを定義
@app.get("/hello")
def read_root(cred=Depends(get_current_user)):
    uid = cred.get("uid")
    return {"message": f"Hello, {uid}!"}


# postを定義
@app.post("/hello")
def create_message(message: Message, cred=Depends(get_current_user)):
    uid = cred.get("uid")
    return {"message": f"Hello, {message.name}! Your uid is [{uid}]"}


def index(request: Request):
    return {"Hello": "World"}


def get_data(request: Request):
    return {"key": "value", "message": "Hello from FastAPI!"}


def get_tec_result(request: Request, tec_id: int):
    return {
        "is_accepted": True,
        "interests": [
            {
                "user_id": tec_id,
                "name": tec_id,
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


def get_suggested_tecs(request: Request, tec_substring):
    tmp_tecs = ["Java", "JavaScript", "SolidJS", "Three.JS", "Golang"]

    return {
        "suggested_tecs": [{"id": 1, "name": tec_name} for tec_name in tmp_tecs if tec_substring in tec_name],
    }


def get_profile(request: Request, user_id: str):
    return {
        "name": user_id,
        "icon_url": "http://localhost:3000/logo192.png",
        "sns_link": "https://twitter.com",
	    "comment": "これはテストだよ",
	    "join_date": "2020-05-12",
	    "department": "SkillHub開発部",
	    "interests": [{"id": 1, "name": "MySQL"}, {"id": 1, "name": "SQLite"}, {"id": 1, "name": "Three.JS"}],
	    "expertises": [{"id": 1, "name": "postgreSQL", "years": 3}, {"id": 1, "name": "React", "years": 3}, {"id": 1, "name": "TypeScript", "years": 3}, {"id": 1, "name": "fastAPI", "years": 4}],
	    "experiences": [{"id": 1, "name": "postgreSQL", "years": 3}, {"id": 1, "name": "React", "years": 3}],
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
