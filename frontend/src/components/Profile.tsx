import { useCallback, useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import log1 from "../img/log1.png";

import { GetSuggestedTagsResponse } from "./Home";

interface GetProfileResponse {
	name: string,
	icon_url: string,
	sns_link: string,
	comment: string,
	join_date: string,
	department: string
	interests: {name: string}[],
	expertises: {name: string, years: number}[],
	experiences: {name: string, years: number}[],
}

function Profile() {
  const { user_id } = useParams();

  const [is_editing, setIsEditing] = useState(false);
  const [interest_tag_substring, setInterestTagSubstring] = useState("");
  const [expertise_tag_substring, setExpertiseTagSubstring] = useState("");
  const [experience_tag_substring, setExperienceTagSubstring] = useState("");
  const [suggested_interest_tags, setSuggestedInterestTags] = useState([] as string[]);
  const [suggested_expertise_tags, setSuggestedExpertiseTags] = useState([] as string[]);
  const [suggested_experience_tags, setSuggestedExperienceTags] = useState([] as string[]);

  const [name, setName] = useState("");
  const [icon_url, setIconUrl] = useState("");

  // ユーザー情報を取得
  const { user } = useAuthContext();

  const [textName, setNameText] = useState("");
  const [textMail, setMailText] = useState("");
  const [comment, setComment] = useState("");
  const [join_date, setJoinDate] = useState("1900-12-17");
  const [department, setDepartment] = useState("");
  const [interests, setInterests] = useState([] as {name: string}[]);
  const [expertises, setExpertises] = useState([] as {name: string, years: number}[]);
  const [experiences, setExperiences] = useState([] as {name: string, years: number}[]);

  const [edited_name, setEditedName] = useState("");
  const [edited_Mail, setEditedMail] = useState("");
  const [edited_comment, setEditedComment] = useState("");
  const [edited_join_date, setEditedJoinDate] = useState("1900-12-17");
  const [edited_department, setEditedDepartment] = useState("");
  const [edited_interests, setEditedInterests] = useState([] as {name: string}[]);
  const [edited_expertises, setEditedExpertises] = useState([] as {name: string, years: number}[]);
  const [edited_experiences, setEditedExperiences] = useState([] as {name: string, years: number}[]);

  const edit_start = () => {
    setEditedName(name);
    setEditedMail(textMail);
    setEditedComment(comment);
    setEditedJoinDate(join_date);
    setEditedDepartment(department);
    setEditedInterests(interests);
    setEditedExpertises(expertises);
    setEditedExperiences(experiences);
    setIsEditing(true);
  };
  const edit_end = useCallback(() => {
    setIsEditing(false);
  }, []);
  const edit_complete = useCallback(() => {
    setIsEditing(false);
  }, []);

  // 興味のある技術専用タグサジェストを変更する処理
  const interestTagSubstringChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInterestTagSubstring(e.target.value.trim());
    axios.get('http://localhost:8000/get-suggested-tags/' + e.target.value.trim())
    .then((res) => {
      const get_suggested_tags_res: GetSuggestedTagsResponse = res.data;
      setSuggestedInterestTags(get_suggested_tags_res.suggested_tags);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  // 得意な技術専用タグサジェストを変更する処理
  const expertiseTagSubstringChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setExpertiseTagSubstring(e.target.value.trim());
    axios.get('http://localhost:8000/get-suggested-tags/' + e.target.value.trim())
    .then((res) => {
      const get_suggested_tags_res: GetSuggestedTagsResponse = res.data;
      setSuggestedExpertiseTags(get_suggested_tags_res.suggested_tags);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  // 業務経験のある技術専用タグサジェストを変更する処理
  const experienceTagSubstringChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setExperienceTagSubstring(e.target.value.trim());
    axios.get('http://localhost:8000/get-suggested-tags/' + e.target.value.trim())
    .then((res) => {
      const get_suggested_tags_res: GetSuggestedTagsResponse = res.data;
      setSuggestedExperienceTags(get_suggested_tags_res.suggested_tags);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  const editedNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value.trim());
  }, []);
  const editedMailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedMail(e.target.value.trim());
  }, []);
  const editedCommentChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedComment(e.target.value.trim());
  }, []);
  const editedJoinDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value.trim());
    setEditedJoinDate(e.target.value.trim());
  }, []);
  const editedDepartmentChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedDepartment(e.target.value.trim());
  }, []);

  // 編集中に新たにタグを追加する処理
  const editedInterestsAdd = useCallback((suggested_tag: string) => {
    setInterestTagSubstring("");
    setSuggestedInterestTags([]);
    setEditedInterests(edited_interests => new Array(...edited_interests, {name: suggested_tag}));
  }, []);
  const editedExpertisesAdd = useCallback((suggested_tag: string) => {
    setExpertiseTagSubstring("");
    setSuggestedExpertiseTags([]);
    setEditedExpertises(edited_expertises => new Array(...edited_expertises, {name: suggested_tag, years: 1}));
  }, []);
  const editedExperiencesAdd = useCallback((suggested_tag: string) => {
    setExperienceTagSubstring("");
    setSuggestedExperienceTags([]);
    setEditedExperiences(edited_experiences => new Array(...edited_experiences, {name: suggested_tag, years: 1}));
  }, []);

  // 編集中にタグを削除する処理
  const editedInterestsErase = useCallback((target_index: number) => {
    setEditedInterests(edited_interests => edited_interests.filter((_, index) => (target_index !== index)));
  }, []);
  const editedExpertisesErase = useCallback((target_index: number) => {
    setEditedExpertises(edited_expertises => edited_expertises.filter((_, index) => (target_index !== index)));
  }, []);
  const editedExperiencesErase = useCallback((target_index: number) => {
    setEditedExperiences(edited_experiences => edited_experiences.filter((_, index) => (target_index !== index)));
  }, []);

  // 編集中にタグに対する年数を変更する処理
  const editedExpertisesYearsChange = useCallback((target_index: number, new_years: number) => {
    setEditedExpertises(edited_expertises => edited_expertises.map((expertise, index) => {
      if(target_index === index) return {...expertise, years: new_years};
      return expertise;
    }));
  }, []);
  const editedExperiencesYearsChange = useCallback((target_index: number, new_years: number) => {
    setEditedExperiences(edited_experiences => edited_experiences.map((experience, index) => {
      if(target_index === index) return {...experience, years: new_years};
      return experience;
    }));
  }, []);

  useEffect(() => {
    // プロフィール情報を取得する
    axios.get('http://localhost:8000/get-profile/' + user_id)
    .then((res) => {
      const get_profile_res: GetProfileResponse = res.data;
      console.log(get_profile_res);
      setName(get_profile_res.name);
      setIconUrl(get_profile_res.icon_url);
      setComment(get_profile_res.comment);
      setJoinDate(get_profile_res.join_date);
      setDepartment(get_profile_res.department);
      setInterests(get_profile_res.interests);
      setExpertises(get_profile_res.expertises);
      setExperiences(get_profile_res.experiences);
    })
    .catch((err) => {
      console.log(err);
    });
  }, [user_id]);

  return (
    <>
      <div className="container">
        <div className="d-flex">
          <div className="col-4 mt-5">
            <img
              src={user?.photoURL || log1}
              className="rounded-circle border border-dark"
              alt="アイコン"
            />
          </div>
          <div className="col-8">
            <div className="mt-5 mb-5 d-flex">
              <p className=" mb-1">名前</p>

              {is_editing ? (
                <p className="text-center w-75 ml-auto">{user?.displayName}</p>
              ) : (
                <p className="text-center w-75 ml-auto">{textName}</p>
              )}
            </div>
            <div className="mb-5 d-flex">
              <p className=" mb-1">メールアドレス</p>

              {is_editing ? (
                <p className="text-center w-75 ml-auto">{user?.email}</p>
              ) : (
                <p className="text-center w-75 ml-auto">{textMail}</p>
              )}
            </div>
            <div className="mb-5 d-flex">
              <p className=" mb-1">ひとこと</p>

              {is_editing ? (
                <input
                  type="text"
                  className="form-control w-75 ml-auto"
                  value={edited_comment}
                  onChange={editedCommentChange}
                />
              ) : (
                <p className="text-center w-75 ml-auto">{comment}</p>
              )}
            </div>
            <div className="mb-5 d-flex">
              <p className=" mb-1">入社日</p>

              {is_editing ? (
                <input
                  type="date"
                  className="form-control w-75 ml-auto"
                  value={new Date(edited_join_date).toLocaleDateString('sv-SE')}
                  onChange={editedJoinDateChange}
                />
              ) : (
                <p className="text-center w-75 ml-auto">{new Date(join_date).toLocaleDateString('sv-SE')}</p>
              )}
            </div>
            <div className="mb-5 d-flex">
              <p className=" mb-1">所属先</p>

              {is_editing ? (
                <input
                  type="text"
                  className="form-control w-75 ml-auto"
                  value={edited_department}
                  onChange={editedDepartmentChange}
                />
              ) : (
                <p className="text-center w-75 ml-auto">{department}</p>
              )}
            </div>
            <div className="mb-5 d-flex">
              <p className="w-25 mb-1">興味のある技術</p>

              {is_editing ? (
                <div className="w-75">
                  {
                    edited_interests.map((interest, index) => {
                      return <div className="d-flex">
                        <h6 className="w-50 form-control">{interest.name}</h6>
                        <button className="btn btn-secondary ml-3 p-1 h6" onClick={() => {editedInterestsErase(index)}}>削除</button>
                      </div>
                    })
                  }
                  <input type="text" className="w-50 form-control" value={interest_tag_substring} onChange={interestTagSubstringChange}/>
                  {
                    suggested_interest_tags.map(suggested_tag => {
                      return (
                        <button
                          className="btn btn-link p-0 mx-2"
                          onClick={() => {editedInterestsAdd(suggested_tag)}}
                        >
                          {suggested_tag}
                        </button>
                      )
                    })
                  }
                </div>
              ) : (
                <div className="d-flex flex-wrap ml-5">
                  {
                    interests.map((interest, index) => {
                      return <>
                        { index > 0 && <p className="">,</p> }
                        <p className="">{interest.name}</p>
                      </>
                    })
                  }
                </div>
              )}
            </div>
            <div className="mb-5 d-flex">
              <p className="w-25 mb-1">業務経験のある技術</p>

              {is_editing ? (
                <div className="w-75">
                  {
                    edited_experiences.map((experience, index) => {
                      return <div className="d-flex">
                        <h1 className="w-50 form-control">{experience.name}</h1>
                        <input type="number" className="w-25 form-control ml-2" value={experience.years} onChange={(e) => {editedExperiencesYearsChange(index, parseInt(e.target.value))}}/>
                        <button className="btn btn-secondary ml-3 p-1 h6" onClick={() => {editedExperiencesErase(index)}}>削除</button>
                      </div>
                    })
                  }
                  <input type="text" className="w-50 form-control" value={experience_tag_substring} onChange={experienceTagSubstringChange}/>
                  {
                    suggested_experience_tags.map(suggested_tag => {
                      return (
                        <button
                          className="btn btn-link p-0 mx-2"
                          onClick={() => {editedExperiencesAdd(suggested_tag)}}
                        >
                          {suggested_tag}
                        </button>
                      )
                    })
                  }
                </div>
              ) : (
                <div className="d-flex flex-wrap ml-5">
                  {
                    experiences.map((experience, index) => {
                      return <>
                        { index > 0 && <p className="">,</p> }
                        <p className="">{experience.name}</p>
                      </>
                    })
                  }
                </div>
              )}
            </div>
            <div className="mb-5 d-flex">
              <p className="w-25 mb-1">得意な技術</p>

              {is_editing ? (
                <div className="w-75">
                  {
                    edited_expertises.map((expertise, index) => {
                      return <div className="d-flex">
                        <h1 className="w-50 form-control">{expertise.name}</h1>
                        <input type="number" className="w-25 form-control ml-2" value={expertise.years} onChange={(e) => {editedExpertisesYearsChange(index, parseInt(e.target.value))}}/>
                        <button className="btn btn-secondary ml-3 p-1 h6" onClick={() => {editedExpertisesErase(index)}}>削除</button>
                      </div>
                    })
                  }
                  <input type="text" className="w-50 form-control" value={expertise_tag_substring} onChange={expertiseTagSubstringChange}/>
                  {
                    suggested_expertise_tags.map(suggested_tag => {
                      return (
                        <button
                          className="btn btn-link p-0 mx-2"
                          onClick={() => {editedExpertisesAdd(suggested_tag)}}
                        >
                          {suggested_tag}
                        </button>
                      )
                    })
                  }
                </div>
              ) : (
                <div className="d-flex flex-wrap ml-5">
                  {
                    expertises.map((expertise, index) => {
                      return <>
                        { index > 0 && <p className="">,</p> }
                        <p className="">{expertise.name}</p>
                      </>
                    })
                  }
                </div>
              )}
            </div>

            <div className="d-flex">
              { is_editing ?
                <>
                  <button
                    className="ml-auto mr-5 mb-5 mt-4 btn btn-primary"
                    onClick={edit_end}
                  >
                    編集やめる
                  </button>
                  <button
                    className="ml-auto mr-5 mb-5 mt-4 btn btn-primary"
                    onClick={edit_complete}
                  >
                    編集完了
                  </button>
                </> :
                <button
                  className="ml-auto mr-5 mb-5 mt-4 btn btn-primary"
                  onClick={edit_start}
                >
                  編集
                </button>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
