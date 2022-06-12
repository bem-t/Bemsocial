import { Feed } from "../../components/feed/Feed";
import { Rightbar } from "../../components/rightbar/Rightbar";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { Topbar } from "../../components/topbar/Topbar";
import "./profile.css";
import { useEffect, useState } from "react";
import axios from 'axios'
import {useParams} from "react-router"

export const Profile = () => {
  const PF = process.env.REACT_APP_PROFILE_PICTURE;
  const [user, setUser] =useState({})
  const username = useParams().username;

  useEffect(()=>{
    const fetchUser = async()=>{
      const {data} = await axios.get(`/users?username=${username}`)
      setUser(data)
    }
    fetchUser()
  },[username])

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRigth">
          <div className="profileRightTop">
            <div className="profileCover">
              <img className="profileCoverImg" src={user.coverPicture || PF+"9.jpeg"} alt="" />
              <img className="profileUserImg" src={user.profilePicture || PF+"8.jpeg"} alt="" />
            </div>
              <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <p className="profileInfoDecs">{user.desc}</p>
              </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username}/>
            <Rightbar user={user}/>
          </div>
        </div>
      </div>
    </>
  );
};
