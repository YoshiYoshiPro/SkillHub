import os
from typing import Optional

import requests
from dotenv import load_dotenv
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt

load_dotenv("../.env")  # .envファイルのパスを指定
CLIENT_ID = os.environ.get("CLIENT_ID")
CLIENT_SECRET = os.environ.get("CLIENT_SECRET")
DOMAIN = os.environ.get("DOMAIN")

JWKS_URL = f"https://{DOMAIN}/.well-known/jwks.json"
ALGORITHMS = ["RS256"]

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


# キャッシュ変数の初期化
PUBLIC_KEY_CACHE = {}


def get_public_key(kid: str) -> Optional[str]:
    # キャッシュから公開鍵を取得
    if kid in PUBLIC_KEY_CACHE:
        return PUBLIC_KEY_CACHE[kid]

    try:
        # タイムアウトを設定してリクエストを行う
        response = requests.get(JWKS_URL, timeout=10)

        # ステータスコードの確認
        response.raise_for_status()

        jwks = response.json()
        for key in jwks["keys"]:
            if key["kid"] == kid:
                cert = key["x5c"][0]
                pem_key = (
                    f"-----BEGIN CERTIFICATE-----\n{cert}\n-----END CERTIFICATE-----"
                )

                # 公開鍵をキャッシュに保存
                PUBLIC_KEY_CACHE[kid] = pem_key
                return pem_key
    except requests.Timeout:
        # タイムアウト時のエラーハンドリング
        raise HTTPException(status_code=500, detail="JWKS endpoint request timed out.")
    except requests.RequestException as e:
        # その他のリクエスト関連のエラーハンドリング
        raise HTTPException(
            status_code=500, detail=f"Error occurred while fetching JWKS: {e}"
        )
    except ValueError:
        # JSONデコードエラーのハンドリング
        raise HTTPException(status_code=500, detail="Failed to decode JWKS response.")

    return None


def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        header = jwt.get_unverified_header(token)
        jwk = get_public_key(header["kid"])
        if jwk is None:
            raise credentials_exception
        payload = jwt.decode(
            token,
            jwk,
            algorithms=ALGORITHMS,
            audience=CLIENT_ID,
            issuer=f"https://{DOMAIN}/",
        )
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        return username
    except JWTError:
        raise credentials_exception
