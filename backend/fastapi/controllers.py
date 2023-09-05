import uvicorn
from starlette.requests import Request

from fastapi import FastAPI

app = FastAPI(
    title='社内勉強会の開催を活発にするwebアプリ',
    description='社内の勉強会の予定を共有するWebアプリケーション'
)


def index(request: Request):
    return {'Hello': 'World'}




if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
