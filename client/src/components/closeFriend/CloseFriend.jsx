import "./closeFriend.css"

export const CloseFriend = ({user}) => {
  const PR = process.env.REACT_APP_PROFILE_PICTURE
  return (
    <li className="sidebarFriend">
              <img className="sidebarFriendImg" src={PR + user.profilePicture} alt=""/>
              <span className="sidebarFriendName">{user.username}</span>
    </li>
  )
}
