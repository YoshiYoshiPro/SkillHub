import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  const handleLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      await auth.signInWithPopup(provider);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
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
