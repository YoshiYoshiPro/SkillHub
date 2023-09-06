import uvicorn
from fastapi import FastAPI
from starlette.requests import Request

from .auth import get_current_user

app = FastAPI(title="SkillHub", description="社内の勉強会の予定を共有するWebアプリケーション")


def index(request: Request):
    return {"Hello": "World"}


@app.get("/users/me/")
def read_users_me(current_user: str = Depends(get_current_user)):
    return {"username": current_user}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
