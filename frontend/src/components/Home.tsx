import { useState } from "react";
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

interface SearchTagResponse {
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

interface GetSuggestedTagsResponse {
  suggested_tags: string[];
}

function Home() {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  // ログアウト用の関数
  const handleLogout = () => {
    auth.signOut();
    navigate("/login");
  };

  const [is_searching, setIsSearching] = useState(false);
  const [is_searched, setIsSearched] = useState(false);
  const [tag, setTag] = useState("");
  const [suggested_tags, setSuggestedTags] = useState([
    "SolidJS",
    "Three.JS",
    "Golang",
  ]);

  const [interests, setInterests] = useState(
    [] as { user_id: string; name: string; icon_url: string }[]
  );
  const [expertises, setExpertises] = useState(
    [] as { user_id: string; name: string; icon_url: string; years: number }[]
  );
  const [experiences, setExperiences] = useState(
    [] as { user_id: string; name: string; icon_url: string; years: number }[]
  );

  const data = [
    { name: "1年目", year: 30 },
    { name: "2年目", year: 83 },
    { name: "3年目", year: 140 },
    { name: "4年目", year: 60 },
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

  const search_tag = (tag: string) => {
    axios
      .get("http://localhost:8000/search-tag/" + tag)
      .then((res) => {
        const search_tag_res: SearchTagResponse = res.data;
        if (search_tag_res.is_accepted) {
          setIsSearched(true);
          setTag(tag);
          setInterests(search_tag_res.interests);
          setExpertises(search_tag_res.expertises);
          setExperiences(search_tag_res.experiences);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const get_suggested_tags = (tag_substring: string) => {
    axios
      .get("http://localhost:8000/get-suggested-tags/" + tag_substring)
      .then((res) => {
        const get_suggested_tags_res: GetSuggestedTagsResponse = res.data;
        setSuggestedTags(get_suggested_tags_res.suggested_tags);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
                <h4 className="m-auto col-3">タグ検索</h4>
                <input
                  type="text"
                  className="px-3 py-2 m-0 col-9 border border-gray rounded-pill h3"
                  value={tag}
                  onChange={(e) => {
                    setTag(e.target.value);
                    get_suggested_tags(e.target.value);
                  }}
                />
              </div>
              <div className="d-flex mb-2">
                <div className="col-9 d-flex ml-auto px-2 py-2 lh-auto border border-gray rounded">
                  {suggested_tags.map((tag) => {
                    return (
                      <button
                        className="btn btn-link p-0 mx-2"
                        onClick={() => {
                          search_tag(tag);
                        }}
                      >
                        #{tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {is_searched && (
                <div>
                  <div className="d-flex">
                    <ComposedChart
                      width={600}
                      height={300}
                      data={data}
                      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                    >
                      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Bar dataKey="year" barSize={20} fill="red" />
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
}

export default Home;
