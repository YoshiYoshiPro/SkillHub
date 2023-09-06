import os
from typing import Optional

import requests
from dotenv import load_dotenv
from fastapi import Depends, HTTPException, Security
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt

load_dotenv("../.env")  # .envファイルのパスを指定
CLIENT_ID = os.environ.get("CLIENT_ID")
CLIENT_SECRET = os.environ.get("CLIENT_SECRET")
DOMAIN = os.environ.get("DOMAIN")

JWKS_URL = f"https://{DOMAIN}/.well-known/jwks.json"
ALGORITHMS = ["RS256"]

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def get_public_key(kid: str) -> Optional[str]:
    jwks = requests.get(JWKS_URL).json()
    for key in jwks["keys"]:
        if key["kid"] == kid:
            cert = key["x5c"][0]
            return f"-----BEGIN CERTIFICATE-----\n{cert}\n-----END CERTIFICATE-----"
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
