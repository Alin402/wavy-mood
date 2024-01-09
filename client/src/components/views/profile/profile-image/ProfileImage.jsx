import "../Profile.css";
import { BiSolidUserRectangle as UserIcon } from "react-icons/bi";

const ProfileImage = ({ imageUrl, username, noOfFollowers }) => {
    return (
        <div className="profile-image">
            {
                imageUrl ?
                <img
                    src={imageUrl}
                    className="profile-image-image"
                /> :
                <UserIcon size={150} />
            }
            <h2 className="margin-top profile-image-username">{username}</h2>
        </div>
    )
}

export default ProfileImage;