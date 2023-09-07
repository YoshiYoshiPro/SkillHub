import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { ComposedChart, CartesianGrid, XAxis, YAxis, Bar } from "recharts";
interface SessionSuggestionPost {
  technology: string;
  likes: number;
  date: Date;
}

function Home() {
  const [is_searching, setIsSearching] = useState(false);
  const Data = [
    {
      name: "1年目 業務経験",
      業務経験: 10,
      得意な人: 10,
      興味のある人: 10,
    },
    {
      name: "2年目 業務経験",
      業務経験: 10,
      得意な人: 0,
      興味のある人: 0,
    },
    {
      name: "3年目 業務経験",
      業務経験: 10,
      得意な人: 0,
      興味のある人: 0,
    },
    {
      name: "2年目 得意な人",
      業務経験: 0,
      得意な人: 10,
      興味のある人: 0,
    },
    {
      name: "3年目 得意な人",
      業務経験: 0,
      得意な人: 22,
      興味のある人: 0,
    },
    {
      name: "4年目 得意な人",
      業務経験: 0,
      得意な人: 31,
      興味のある人: 0,
    },
    {
      name: "興味のある人",
      業務経験: 0,
      得意な人: 0,
      興味のある人: 30,
    },
  ];

  const posts: SessionSuggestionPost[] = [
    {
      technology: "SolidJS",
      likes: 20,
      date: new Date("2020-05-12T23:50:21.817Z"),
    },
    {
      technology: "Three.JS",
      likes: 10,
      date: new Date("2020-05-12T23:50:21.817Z"),
    },
    {
      technology: "Golang",
      likes: 3,
      date: new Date("2020-05-12T23:50:21.817Z"),
    },
  ];

  const trending_technologies = ["SolidJS", "Three.JS", "Golang"];

  const tmp_users = [
    {
      id: "111111",
      name: "テスト男",
      icon_url: "http://localhost:3000/logo192.png",
    },
    {
      id: "222222",
      name: "テスト女",
      icon_url: "http://localhost:3000/logo192.png",
    },
    {
      id: "333333",
      name: "テスト爺",
      icon_url: "http://localhost:3000/logo192.png",
    },
    {
      id: "444444",
      name: "テスト婆",
      icon_url: "http://localhost:3000/logo192.png",
    },
  ];

  return (
    <>
      <Modal show={is_searching} size="lg" onHide={() => setIsSearching(false)}>
        <Modal.Body>
          <div className="container">
            <div className="d-flex flex-wrap mb-2">
              <h4 className="m-auto col-3">タグ検索</h4>
              <input
                type="text"
                className="px-3 py-2 m-0 col-9 border border-gray rounded-pill h3"
              />
            </div>
            <div className="d-flex mb-2">
              <div className="col-9 d-flex ml-auto px-2 py-2 lh-auto border border-gray rounded">
                {trending_technologies.map((technology) => {
                  return (
                    <button className="btn btn-link p-0 mx-2">
                      #{technology}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="d-flex">
              <ComposedChart
                width={793}
                height={500}
                layout="vertical"
                data={Data}
                margin={{ top: 20, right: 60, bottom: 0, left: 150 }}
              >
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />

                <CartesianGrid strokeDasharray="3 3" />
                <Bar
                  dataKey="業務経験"
                  stackId="a"
                  barSize={20}
                  fill="#2250A2"
                />
                <Bar
                  dataKey="得意な人"
                  stackId="a"
                  barSize={20}
                  fill="#FF8042"
                />
                <Bar
                  dataKey="興味のある人"
                  stackId="a"
                  barSize={20}
                  fill="#00C49F"
                />
              </ComposedChart>
            </div>

            <div className="d-flex flex-wrap">
              {tmp_users.map((user) => {
                return (
                  <div className="col-6 p-0">
                    <div className="m-2 p-1 border border-gray rounded d-flex">
                      <img
                        className="border border-dark rounded-circle m-1"
                        src={user.icon_url}
                        width={50}
                      />
                      <div className="my-auto">
                        <h4 className="m-0">{user.name}</h4>
                        <p className="m-0">{user.id}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            onClick={() => setIsSearching(false)}
          >
            閉じる
          </button>
        </Modal.Footer>
      </Modal>

      <div className="container">
        <div className="d-flex mt-2">
          <div className="col-8 border border-dark">
            <h4 className="text-center m-2">タイムライン</h4>
            {posts.map((post) => {
              return (
                <div className="border-top border-dark">
                  <p className="border-bottom border-dark m-0 p-2">
                    {post.technology}に興味を持っている人が10人います！
                    <br />
                    勉強会を開催してみませんか？
                  </p>
                  <button className="btn btn-primary m-2">
                    参加したい {post.likes}
                  </button>
                </div>
              );
            })}
          </div>
          <div className="col-4 mx-5">
            <div className="sticky-top">
              <button
                className="btn btn-light border-dark w-100"
                onClick={() => setIsSearching(true)}
              >
                検索
              </button>
            </div>
            <div className="m-2">
              {trending_technologies.map((techonology) => {
                return <h5 className="fw-bold">#{techonology}</h5>;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
