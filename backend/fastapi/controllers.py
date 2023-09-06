import uvicorn
from starlette.requests import Request

from fastapi import FastAPI

app = FastAPI(
    title='社内勉強会の開催を活発にするwebアプリ',
    description='社内の勉強会の予定を共有するWebアプリケーション'
)


def index(request: Request):
    return {'Hello': 'World'}


def get_data(request: Request):
    return {"key": "value","message":"Hello from FastAPI!"}
