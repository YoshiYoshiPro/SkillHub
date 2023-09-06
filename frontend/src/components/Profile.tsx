import { useCallback, useState } from "react";
import log1 from "../img/log1.png";

function Profile() {
  const [textName, setNameText] = useState("");
  const [textMail, setMailText] = useState("");
  const [textJoin, setJoinText] = useState("");
  const [textWord, setWordText] = useState("");
  const [textAff, setAffText] = useState("");
  const [textInterest, setInterestText] = useState("");
  const [textBusiness, setBusinessText] = useState("");
  const [textGood, setGoodText] = useState("");
  const [chenge, setChenge] = useState(true);

  const handleEdit = useCallback(() => {
    setChenge((prevchenge) => !prevchenge);
  }, []);

  const nameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNameText(e.target.value.trim());
  }, []);
  console.log();

  const mailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMailText(e.target.value.trim());
  }, []);
  const joinChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setJoinText(e.target.value.trim());
  }, []);
  const wordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setWordText(e.target.value.trim());
  }, []);
  const AffChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAffText(e.target.value.trim());
  }, []);
  const interestChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInterestText(e.target.value.trim());
    },
    []
  );
  const businessChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setBusinessText(e.target.value.trim());
    },
    []
  );
  const goodChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setGoodText(e.target.value.trim());
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
            <div className="mt-5 mb-5 d-flex">
              <p className=" mb-1">名前</p>
              {chenge ? (
                <input
                  type="text"
                  className="form-control w-75 ml-auto"
                  value={textName}
                  onChange={nameChange}
                />
              ) : (
                <p className="text-center w-75 ml-auto">{textName}</p>
              )}
            </div>
            <div className="mb-5 d-flex">
              <p className=" mb-1">メールアドレス:</p>

              {chenge ? (
                <input
                  type="text"
                  className="form-control w-75 ml-auto"
                  value={textMail}
                  onChange={mailChange}
                />
              ) : (
                <p className="text-center w-75 ml-auto">{textMail}</p>
              )}
            </div>
            <div className="mb-5 d-flex">
              <p className=" mb-1">ひとこと</p>

              {chenge ? (
                <input
                  type="text"
                  className="form-control w-75 ml-auto"
                  value={textWord}
                  onChange={wordChange}
                />
              ) : (
                <p className="text-center w-75 ml-auto">{textWord}</p>
              )}
            </div>
            <div className="mb-5 d-flex">
              <p className=" mb-1">入社年数</p>

              {chenge ? (
                <input
                  type="text"
                  className="form-control w-75 ml-auto"
                  value={textJoin}
                  onChange={joinChange}
                />
              ) : (
                <p className="text-center w-75 ml-auto">{textJoin}</p>
              )}
            </div>
            <div className="mb-5 d-flex">
              <p className=" mb-1">所属先</p>

              {chenge ? (
                <input
                  type="text"
                  className="form-control w-75 ml-auto"
                  value={textAff}
                  onChange={AffChange}
                />
              ) : (
                <p className="text-center w-75 ml-auto">{textAff}</p>
              )}
            </div>
            <div className="mb-5 d-flex">
              <p className=" mb-1">興味のある技術</p>

              {chenge ? (
                <input
                  type="text"
                  className="form-control w-75 ml-auto"
                  value={textInterest}
                  onChange={interestChange}
                />
              ) : (
                <p className="text-center w-75 ml-auto">{textInterest}</p>
              )}
            </div>
            <div className="mb-5 d-flex">
              <p className=" mb-1">業務経験のある技術</p>

              {chenge ? (
                <input
                  type="text"
                  className="form-control w-75 ml-auto"
                  value={textBusiness}
                  onChange={businessChange}
                />
              ) : (
                <p className="text-center w-75 ml-auto">{textBusiness}</p>
              )}
            </div>
            <div className="mb-5 d-flex">
              <p className=" mb-1">得意な技術</p>

              {chenge ? (
                <input
                  type="text"
                  className="form-control w-75 ml-auto"
                  value={textGood}
                  onChange={goodChange}
                />
              ) : (
                <p className="text-center w-75 ml-auto">{textGood}</p>
              )}
            </div>

            <div className="d-flex">
              <button
                className="ml-auto mr-5 mb-5 mt-4 btn btn-primary"
                onClick={handleEdit}
              >
                {chenge ? "完了" : "編集"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
