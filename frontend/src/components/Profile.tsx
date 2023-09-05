import { useCallback, useState } from "react";
import log1 from "../img/log1.png";
function Profile() {
  const [textName, setNameText] = useState("");
  const [textMail, setMailText] = useState("");
  const [textJoin, setJoinText] = useState("");
  const [text, setText] = useState("");
  const [text, setText] = useState("");
  const [text, setText] = useState("");
  const [text, setText] = useState("");
  const [text, setText] = useState("");
  const [text, setText] = useState("");
  const [text, setText] = useState("");
  const [text, setText] = useState("");

  const nameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 5) {
      alert("5文字以内");
      return;
    }
    setNameText(e.target.value.trim());
  }, []);
  const mailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 5) {
      alert("5文字以内");
      return;
    }
    setMailText(e.target.value.trim());
  }, []);
  const joinChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 5) {
      alert("5文字以内");
      return;
    }
    setText(e.target.value.trim());
  }, []);
  const wordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 5) {
      alert("5文字以内");
      return;
    }
    setText(e.target.value.trim());
  }, []);
  const AffiliationChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length > 5) {
        alert("5文字以内");
        return;
      }
      setText(e.target.value.trim());
    },
    []
  );
  const interestChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length > 5) {
        alert("5文字以内");
        return;
      }
      setText(e.target.value.trim());
    },
    []
  );
  const businessChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length > 5) {
        alert("5文字以内");
        return;
      }
      setText(e.target.value.trim());
    },
    []
  );
  const goodChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 5) {
      alert("5文字以内");
      return;
    }
    setText(e.target.value.trim());
  }, []);

  return (
    <>
      <div className="container">
        <div className="d-flex">
          <div className="col-4 mt-5">
            <img
              src={log1}
              className="rounded-circle border border-dark"
              alt="アイコン"
            />
          </div>
          <div className="col-8">
            <div className="mb-5 d-flex">
              <p className="mt-5 mb-1">名前</p>
              <input
                type="text"
                className="form-control"
                value={textName}
                onChange={nameChange}
              />
            </div>
            <div className="mb-5 d-flex">
              <p className="mt-5 mb-1">メールアドレス:</p>
              <input
                type="text"
                className="form-control"
                value={textMail}
                onChange={mailChange}
              />
            </div>
            <div className="mb-5 d-flex">
              <p className="mt-5 mb-1">ひとこと</p>
              <input
                type="text"
                className="form-control"
                value={text}
                onChange={wordChange}
              />
            </div>
            <div className="mb-5 d-flex">
              <p className="mt-5 mb-1">入社年数</p>
              <input
                type="text"
                className="form-control"
                value={text}
                onChange={joinChange}
              />
            </div>
            <div className="mb-5 d-flex">
              <p className="mt-5 mb-1">所属先</p>
              <input
                type="text"
                className="form-control"
                value={text}
                onChange={AffiliationChange}
              />
            </div>
            <div className="mb-5 d-flex">
              <p className="mt-5 mb-1">興味のある技術</p>
              <input
                type="text"
                className="form-control"
                value={text}
                onChange={interestChange}
              />
            </div>
            <div className="mb-5 d-flex">
              <p className="mt-5 mb-1">業務経験のある技術</p>
              <input
                type="text"
                className="form-control"
                value={text}
                onChange={businessChange}
              />
            </div>
            <div className="mb-5 d-flex">
              <p className="mt-5 mb-1">得意な技術</p>
              <input
                type="text"
                className="form-control"
                value={text}
                onChange={goodChange}
              />
            </div>

            <div className="d-flex">
              <button className="ml-auto mr-5 mt-4 btn btn-primary">
                編集
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
