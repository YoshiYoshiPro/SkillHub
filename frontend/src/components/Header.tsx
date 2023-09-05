import { Link } from 'react-router-dom';

interface SessionSuggestionPost {
  technology: string,
  likes: number,
  date: Date,
}

function Header() {

  return <header>
		<div className="d-flex px-3 py-1 border-bottom border-dark">
			<Link to="/" className='text-decoration-none my-auto'>
				<h1 className="my-0">SkillHub</h1>
			</Link>
			<div className="ml-auto my-auto">
				<Link to="/profile">
					<img className='border border-dark rounded-circle' src="http://localhost:3000/logo192.png" width={50}/>
				</Link>
			</div>
		</div>
  </header>
}

export default Header;
