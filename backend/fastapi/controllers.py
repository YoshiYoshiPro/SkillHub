import uvicorn
from starlette.requests import Request
from starlette.middleware.cors import CORSMiddleware

from fastapi import FastAPI

app = FastAPI(
    title='社内勉強会の開催を活発にするwebアプリ',
    description='社内の勉強会の予定を共有するWebアプリケーション'
)

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


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
