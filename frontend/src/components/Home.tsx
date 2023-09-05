interface SessionSuggestionPost {
  technology: string,
  likes: number,
  date: Date,
}

function Home() {

  const posts: SessionSuggestionPost[] = [
    { technology: "SolidJS", likes: 20, date: new Date("2020-05-12T23:50:21.817Z") },
    { technology: "Three.JS", likes: 10, date: new Date("2020-05-12T23:50:21.817Z") },
    { technology: "Golang", likes: 3, date: new Date("2020-05-12T23:50:21.817Z") },
  ]

  const trending_technologies = ["SolidJS", "Three.JS", "Golang"]

  return <div className="container">
    <div className="d-flex mt-2">
      <div className="col-8 border border-dark">
        <h4 className="text-center m-2">タイムライン</h4>
        {
          posts.map(post => {
            return <div className="border-top border-dark">
              <p className="border-bottom border-dark m-0 p-2">{post.technology}に興味を持っている人が10人います！<br/>勉強会を開催してみませんか？</p>
              <button className="btn btn-primary m-2">参加したい {post.likes}</button>
            </div>
          })
        }
      </div>
      <div className="col-4 mx-5">
        <div className="sticky-top">
          <button className="btn btn-light border-dark w-100" data-bs-toggle="modal" data-bs-target="#exampleModal">検索</button>
        </div>
        <div className="m-2">
          {
            trending_technologies.map(techonology => {
              return <h5 className="fw-bold">#{techonology}</h5>
            })
          }
        </div>
      </div>
    </div>
  </div>
}

export default Home;
