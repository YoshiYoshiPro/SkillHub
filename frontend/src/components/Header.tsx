import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

interface SessionSuggestionPost {
  technology: string;
  likes: number;
  date: Date;
}

function Header() {
  const { user } = useAuthContext();

  return (
    <header>
      <div className="d-flex px-3 py-1 border-bottom border-dark">
        <Link to="/" className="text-decoration-none my-auto">
          <h1 className="my-0">SkillHub</h1>
        </Link>
        {/* <div className="ml-auto">
          <button className="my-0">a</button>
        </div> */}
        <div className="ml-auto my-auto">
          <button className="mr-5 ">ログアウト</button>

          <Link to={"/profile/" + user?.uid}>
            <img
              className="border border-dark rounded-circle"
              src={user?.photoURL || "http://localhost:3000/logo192.png"}
              width={50}
            />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
