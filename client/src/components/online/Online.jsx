import './online.css'

export const Online = ({user}) => {
  const PR = process.env.REACT_APP_PROFILE_PICTURE
  return (
      <li className="rightbarFriend">
        <div className="rightbarProfileImgContainer">
          <img className="rightbarProfileImg" src={PR + user.profilePicture} alt="" />
          <span className="rightbarOnline"></span>
        </div>
        <span className="rightbarUserName">{user.username}</span>
      </li>
  )
}
