import "./ImageUpload.css";
import { BiSolidUserRectangle as UserIcon } from "react-icons/bi";

const ImageUpload = ({ image }) => {
    return (
        <div className="image-upload" style={{ backgroundImage: image }}>
            {
                !image ? <UserIcon size={80} color={"#a9a9a9"} />:
                <img className="profile-img" src={image} />
            }
        </div>
    )
}

export default ImageUpload;