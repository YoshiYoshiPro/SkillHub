import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import { signInWithPopup, getAuth, getIdToken } from "firebase/auth";
import { useAuthContext } from "../context/AuthContext";

const FASTAPI_ENDPOINT = "http://localhost:8000";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const { user } = useAuthContext();

  const handleLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await getIdToken(result.user);
      console.log("ID Token:", token);
      // FastAPI エンドポイントにリクエストを送信
      await sendRequestToBackend(token);
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        // 型チェック
        console.log(error.message);
        setError(error.message);
      } else {
        // errorがErrorオブジェクトでない場合の処理（必要に応じて）
        console.log(error);
        setError("An unknown error occurred.");
      }
    }
  };

  const sendRequestToBackend = async (token: string) => {
    const apiUrl = `${FASTAPI_ENDPOINT}/users/`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ user_id: user?.uid }),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <>
      <div className="container p-5">
        <div className="d-flex my-5">
          <div className="col-12 mt-5 border border-dark p-5 rounded">
            <h3 className="mb-5">ログイン</h3>
            <div className="d-flex">
              <div className="ml-5 ml-auto mr-5 mt-4">
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleLogin}
                >
                  Googleログイン
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
