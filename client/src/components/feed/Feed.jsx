import { Share } from "../share/Share"
import Post from "../posts/Post"
import "./feed.css"
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export const Feed = ({username}) => {
  const[post,setPost] = useState([]);
  const {user} = useContext(AuthContext)

  useEffect(()=>{
    const getPost = async()=>{
      const res = username 
      ? await axios.get('/posts/profile/'+ username)
      : await axios.get("/posts/timeline/" + user._id)
      setPost(res.data.sort((p1,p2)=>{
        return new Date(p2.createdAt) - new Date(p1.createdAt)
      }));
    };
    getPost()
  },[username, user._id])

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username == user.username) && <Share />}
        {
          post.map((p)=>(
            <Post key={p._id} post={p} />
          ))
        }
      </div>
    </div>
  )
}
