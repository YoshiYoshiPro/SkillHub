import uvicorn
from fastapi import FastAPI
from starlette.requests import Request

app = FastAPI(title="社内勉強会の開催を活発にするwebアプリ", description="社内の勉強会の予定を共有するWebアプリケーション")


def index(request: Request):
    return {"Hello": "World"}
