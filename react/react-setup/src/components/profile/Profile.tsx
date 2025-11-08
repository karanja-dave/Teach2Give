import './profile.css'
type profileDetails={
    name:string;
    avatar:string;
    bio:string;
}

export const Profile = ({name,avatar,bio}:profileDetails) => { //name,avatar and bio are traits passed from parent to be used by child
  return (
    <div className="profile-card">
        <img src={avatar} alt={name} className="profile-avatar" ></img>
        <h2 className="profile-name">{name}</h2>
        <p className="profile-bio">{bio}</p>
    </div>
   
  )
}
