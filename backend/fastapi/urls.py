from controllers import *

# FastAPIのルーティング用関数
app.add_api_route("/", index)


@app.get("/login")
async def login(request: Request):
    redirect_uri = url_for("auth")
    return await oauth.auth0.authorize_redirect(request, redirect_uri)


@app.route("/callback")
async def callback(request: Request):
    token = await oauth.auth0.authorize_access_token(request)
    user = await oauth.auth0.parse_id_token(request, token)
    request.session["user"] = dict(user)
    return RedirectResponse(url_for("profile"))


@app.get("/profile")
async def profile(request: Request):
    user = request.session.get("user")
    if user is None:
        raise HTTPException(status_code=401)
    return user
