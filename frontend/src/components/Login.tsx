function Login() {
  return (
    <>
      <div className="container p-5">
        <div className="d-flex my-5">
          <div className="col-12 mt-5 border border-dark p-5 rounded">
            <h3 className="mb-4">ログイン</h3>

            <div className="mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="メールアドレスを入力しでください"
              />
            </div>

            <div className="mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="パスワードを入力してください"
              />
            </div>

            <div className="">
              <input
                type="text"
                className="form-control"
                placeholder="再度パスワードを入力してください"
              />
            </div>

            <div className="d-flex">
              <div className="ml-5 ml-auto mr-5 mt-4">
                <button type="button" className="btn btn-primary">
                  ログイン
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
