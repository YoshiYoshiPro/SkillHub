import log1 from "../imges/log1.png";

function Profile() {
  // const handleClic = useCallback(() => {
  //   // a
  // });

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
            <p className="mt-5 mb-1">名前</p>
            <p className="mb-1">メールアドレス：</p>
            <p className="mb-1">ひとこと</p>

            <p className="mt-4 mb-1">入社年数</p>
            <p className="mb-1">所属先</p>

            <p className="mb-1">興味のある技術</p>
            <p className="mt-4 mb-1">業務経験のある技術</p>
            <p className="mb-1">得意な技術</p>
            <div className="d-flex">
              <button className="ml-auto mr-5 mt-4">編集</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
