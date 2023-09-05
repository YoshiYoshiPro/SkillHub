import os

import uvicorn
from authlib.integrations.starlette_client import OAuth
from dotenv import load_dotenv
from fastapi import FastAPI
from starlette.requests import Request

app = FastAPI(title="SkillHub", description="社内の勉強会の予定を共有するWebアプリケーション")

load_dotenv("../.env")  # .envファイルのパスを指定
CLIENT_ID = os.environ.get("CLIENT_ID")
CLIENT_SECRET = os.environ.get("CLIENT_SECRET")
DOMAIN = os.environ.get("DOMAIN")


# Auth0の設定
oauth = OAuth()
oauth.register(
    name="auth0",
    client_id="CLIENT_ID",
    client_secret="CLIENT_SECRET",
    authorize_url=f"https://{DOMAIN}/authorize",
    authorize_params=None,
    access_token_url=f"https://{DOMAIN}/oauth/token",
    access_token_params=None,
    redirect_uri="http://localhost:8000/callback",
    client_kwargs={"scope": "openid profile email"},
)


def index(request: Request):
    return {"Hello": "World"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
