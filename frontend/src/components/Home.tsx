import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { ComposedChart, CartesianGrid, XAxis, YAxis, Bar } from "recharts";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

interface SessionSuggestionPost {
  technology: string;
  likes: number;
  date: Date;
}

interface SearchTecResponse {
  is_accepted: boolean;
  interests: { user_id: string; name: string; icon_url: string }[];
  expertises: {
    user_id: string;
    name: string;
    icon_url: string;
    years: number;
  }[];
  experiences: {
    user_id: string;
    name: string;
    icon_url: string;
    years: number;
  }[];
}

export interface GetTecsResponse {
  tecs: { id: number; name: string }[];
}

function Home() {
  const navigate = useNavigate();
  const { user } = useAuthContext(); // ユーザー情報の取得

  // ログアウト用の関数
  const handleLogout = () => {
    auth.signOut();
    navigate("/login");
  };

  const [is_searching, setIsSearching] = useState(false);
  const [is_searched, setIsSearched] = useState(false);
  const [tec, setTec] = useState("");
  const [trend_tecs, setTrendTecs] = useState(
    [] as { id: number; name: string }[]
  );
  const [suggested_tecs, setSuggestedTecs] = useState(
    [] as { id: number; name: string }[]
  );

  const [interests, setInterests] = useState(
    [] as { user_id: string; name: string; icon_url: string }[]
  );
  const [expertises, setExpertises] = useState(
    [] as { user_id: string; name: string; icon_url: string; years: number }[]
  );
  const [experiences, setExperiences] = useState(
    [] as { user_id: string; name: string; icon_url: string; years: number }[]
  );

  const graph_data = useCallback(() => {
    const expertise_counter = new Map<number, number>();
    const experience_counter = new Map<number, number>();

    expertises.forEach(expertise => {
      const expertise_count = expertise_counter.get(expertise.years);
      if(expertise_count === undefined) expertise_counter.set(expertise.years, 1);
      else expertise_counter.set(expertise.years, expertise_count + 1);
    });
    experiences.forEach(experience => {
      const experience_count = experience_counter.get(experience.years);
      if(experience_count === undefined) experience_counter.set(experience.years, 1);
      else experience_counter.set(experience.years, experience_count + 1);
    });

    return [
      {
        name: "興味のある人",
        業務経験: 0,
        得意な人: 0,
        興味のある人: interests.length,
      },
      ...Array.from(experience_counter).map(([years, count]) => {
        return {
          name: "業務経験(" + years + "年目)",
          業務経験: count,
          得意な人: 0,
          興味のある人: 0,
        }
      }),
      ...Array.from(expertise_counter).map(([years, count]) => {
        return {
          name: "得意(" + years + "年目)",
          業務経験: 0,
          得意な人: count,
          興味のある人: 0,
        }
      })
    ]
  }, [interests, expertises, experiences])();

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

  const search_tec = (tec: { id: number; name: string }) => {
    axios
      .get("http://localhost:8000/search-tec/" + tec.id)
      .then((res) => {
        const search_tec_res: SearchTecResponse = res.data;
        if (search_tec_res.is_accepted) {
          setIsSearched(true);
          setTec(tec.name);
          setInterests(search_tec_res.interests);
          setExpertises(search_tec_res.expertises);
          setExperiences(search_tec_res.experiences);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const get_suggested_tecs = (tec_substring: string) => {
    axios
      .get("http://localhost:8000/get-suggested-tecs/" + tec_substring)
      .then((res) => {
        const get_suggested_tecs_res: GetTecsResponse = res.data;
        setSuggestedTecs(get_suggested_tecs_res.tecs);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/get-trend-tecs/")
      .then((res) => {
        const get_trend_tecs_res: GetTecsResponse = res.data;
        setTrendTecs(get_trend_tecs_res.tecs);
        setSuggestedTecs(get_trend_tecs_res.tecs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!user) {
    navigate("/login");
    return null;
  } else {
    return (
      <>
        <Modal
          show={is_searching}
          size="lg"
          onHide={() => setIsSearching(false)}
        >
          <Modal.Body>
            <div className="container">
              <div className="d-flex flex-wrap mb-2">
                <h4 className="m-auto col-3">技術検索</h4>
                <input
                  type="text"
                  className="px-3 py-2 m-0 col-9 border border-gray rounded-pill h3"
                  value={tec}
                  onChange={(e) => {
                    setTec(e.target.value);
                    if (e.target.value === "") setSuggestedTecs(trend_tecs);
                    else get_suggested_tecs(e.target.value);
                  }}
                />
              </div>
              <div className="d-flex mb-2">
                <div className="col-9 d-flex ml-auto px-2 py-2 lh-auto border border-gray rounded">
                  {suggested_tecs.map((tec) => {
                    return (
                      <button
                        className="btn btn-link p-0 mx-2"
                        onClick={() => {
                          search_tec(tec);
                        }}
                      >
                        {tec.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {is_searched && (
                <div>
                  <div className="d-flex">
                    <ComposedChart
                      width={793}
                      height={500}
                      layout="vertical"
                      data={graph_data}
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

                  <h4 className="mt-4 mb-0 ml-2">業務経験のある人</h4>
                  <div className="d-flex flex-wrap">
                    {expertises.map((expertise) => {
                      return (
                        <div className="col-6 p-0">
                          <div className="m-2 p-1 border border-gray rounded d-flex">
                            <img
                              className="border border-dark rounded-circle m-1"
                              src={expertise.icon_url}
                              width={50}
                            />
                            <div className="my-auto">
                              <h4 className="m-0">{expertise.name}</h4>
                              <p className="m-0">{expertise.user_id}</p>
                            </div>
                            <h4 className="ml-auto mr-2 my-auto">
                              {expertise.years}年目
                            </h4>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <h4 className="mt-4 mb-0 ml-2">得意な人</h4>
                  <div className="d-flex flex-wrap">
                    {experiences.map((experience) => {
                      return (
                        <div className="col-6 p-0">
                          <div className="m-2 p-1 border border-gray rounded d-flex">
                            <img
                              className="border border-dark rounded-circle m-1"
                              src={experience.icon_url}
                              width={50}
                            />
                            <div className="my-auto">
                              <h4 className="m-0">{experience.name}</h4>
                              <p className="m-0">{experience.user_id}</p>
                            </div>
                            <h4 className="ml-auto mr-2 my-auto">
                              {experience.years}年目
                            </h4>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <h4 className="mt-4 mb-0 ml-2">興味のある人</h4>
                  <div className="d-flex flex-wrap">
                    {interests.map((interest) => {
                      return (
                        <div className="col-6 p-0">
                          <div className="m-2 p-1 border border-gray rounded d-flex">
                            <img
                              className="border border-dark rounded-circle m-1"
                              src={interest.icon_url}
                              width={50}
                            />
                            <div className="my-auto">
                              <h4 className="m-0">{interest.name}</h4>
                              <p className="m-0">{interest.user_id}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
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
              <h4 className="mt-4 text-secondary">トレンド技術</h4>
              <div className="m-2">
                {trend_tecs.map((tec) => {
                  return (
                    <button
                      className="btn btn-link"
                      onClick={() => {
                        search_tec(tec);
                        setIsSearching(true);
                      }}
                    >
                      #{tec.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
