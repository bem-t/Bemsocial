import { useState, useEffect, useContext } from "react"
import {Link} from 'react-router-dom'
import axios from 'axios'
import { MoreVert } from "@mui/icons-material"
import "./posts.css"
import * as timeago from 'timeago.js'
import { AuthContext } from "../../context/AuthContext"

const Post = ({post}) => {
    const [like, setLike] = useState(post.likes.length)
    const [isLiked, setIsLiked] =useState(false)
    const [user, setUser] =useState({})
    const PF = process.env.REACT_APP_PROFILE_PICTURE;
    const {user:currentUser} = useContext(AuthContext)

    const likeHandler=()=>{
        try {
            axios.put("/posts/"+post._id+"/like", {userId:currentUser._id})
        } catch (error) {
            console.log(error)
        }
        if(!isLiked){
            setLike(prev=>prev+1)
            setIsLiked(true)
        }else{
            setLike(prev=>prev-1)
            setIsLiked(false)
        }
    }

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id))
    },[currentUser._id,post.likes])

    useEffect(()=>{
        const fetchUser = async()=>{
          const {data} = await axios.get(`/users?userId=${post.userId}`)
          setUser(data)
        }
        fetchUser()
      },[post.userId])

  return (
    <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <Link to={`profile/${user.username}`}>
                    <img className="postProfileImg" src={user.profilePicture ? PF + user.profilePicture : PF + "9.jpeg"} alt="" />
                    </Link>
                    <span className="postUserName">{user.username}</span>
                    <span className="postDate">{timeago.format(post.createdAt)}</span>
                </div>
                <div className="postTopRight">
                    <MoreVert />
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">{post?.desc}</span>
                <img className="postImg" src={PF + post.img} alt="" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img className="likeIcon" src={`${PF}like.png`} onClick={likeHandler} alt="" />
                    <img className="likeIcon" src={`${PF}heart.png`} onClick={likeHandler} alt="" />
                    <span className="postLikeCounter">{like} poeple like it</span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">{post.comment} comments</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Post
