from typing import List

import uvicorn
from sqlalchemy.orm import Session
from starlette.middleware.cors import CORSMiddleware
from starlette.requests import Request

from core import config
from crud import crud
from fastapi import Depends, FastAPI, HTTPException

# from migration import database, models

app = FastAPI(
    title='社内勉強会の開催を活発にするwebアプリ',
    description='社内の勉強会の予定を共有するWebアプリケーション'
)


# # Dependency
# def get_db():
#     db = database.SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# CORS対応 (https://qiita.com/satto_sann/items/0e1f5dbbe62efc612a78)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

def index(request: Request):
    return {'Hello': 'World'}


def get_data(request: Request):
    return {"key": "value","message":"Hello from FastAPI!"}


def get_tag_result(request: Request, tag):
    return {
        "is_accepted": True,
    	"interests": [
            {"user_id": tag, "name": tag, "icon_url": "http://localhost:3000/logo192.png"},
            {"user_id": "bbb", "name": "いいい", "icon_url": "http://localhost:3000/logo192.png"},
            {"user_id": "ccc", "name": "ううう", "icon_url": "http://localhost:3000/logo192.png"},
        ],
	    "expertises": [
            {"user_id": "ccc", "name": "ううう", "icon_url": "http://localhost:3000/logo192.png", "years": 8},
            {"user_id": "ddd", "name": "えええ", "icon_url": "http://localhost:3000/logo192.png", "years": 13},
        ],
	    "experiences": [
            {"user_id": "aaa", "name": "あああ", "icon_url": "http://localhost:3000/logo192.png", "years": 1},
            {"user_id": "bbb", "name": "いいい", "icon_url": "http://localhost:3000/logo192.png", "years": 2},
            {"user_id": "ccc", "name": "ううう", "icon_url": "http://localhost:3000/logo192.png", "years": 8},
            {"user_id": "ddd", "name": "えええ", "icon_url": "http://localhost:3000/logo192.png", "years": 13},
            {"user_id": "eee", "name": "おおお", "icon_url": "http://localhost:3000/logo192.png", "years": 5},
        ],
    }


def get_suggested_tags(request: Request, tag_substring):
    tmp_tags = ["Java", "JavaScript", "SolidJS", "Three.JS", "Golang"]

    return {
    	"suggested_tags": [tag for tag in tmp_tags if tag_substring in tag],
    }
