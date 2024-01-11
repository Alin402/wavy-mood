import "./AddAlbum.css";
import { useState } from "react";
import { BiSolidPhotoAlbum as PhotoIcon } from "react-icons/bi";
import { createAlbum } from "../../../actions/album";
import { getArtistProfile } from "../../../actions/profile";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddAlbumForm = ({ setOpenAlbumModal }) => {
    const [formAlbumData, setFormAlbumData] = useState({
        name: "",
        coverPhotoUrl: "",
        songs: []
    })

    const [previewCoverPhotoUrl, setPreviewCoverPhotoUrl] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleNameChange = (e) => {
        setFormAlbumData({ ...formAlbumData, name: e.target.value })
    }

    const handleCoverPhotoChange = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setPreviewCoverPhotoUrl(reader.result)
            setFormAlbumData({ ...formAlbumData, coverPhotoUrl: reader.result })
        }
        reader.onerror = (error) => {
            console.log(error);
        }
    }

    const submit = () => {
        dispatch(getArtistProfile((profile) => {
            dispatch(createAlbum(formAlbumData, navigate, setOpenAlbumModal, profile))
        }))
    }

    return (
        <div>
            <h2 className="signup-title">add album</h2>

            <div className="form-group">
                <label className="form-label" htmlFor="name">name of the album</label>
                <input autoFocus className="form-input" id="name" name="name" onChange={(e) => handleNameChange(e)}></input>
            </div>
            <div className="retro-style album-cover-photo">
                <label htmlFor="coverAlbumPhotoUrl" style={{ cursor: "pointer" }}>
                    {
                        !previewCoverPhotoUrl?
                        <>
                            <PhotoIcon size={40} color={"#a9a9a9"} />
                            <h2>Please select a cover photo</h2>
                        </> :
                        <img className="album-preview-photo" src={previewCoverPhotoUrl} />
                    }
                </label>
                <input 
                    accept="image/*"
                    style={{ display: "none" }} 
                    type="file" 
                    name="coverAlbumPhotoUrl" 
                    id="coverAlbumPhotoUrl"
                    onChange={(e) => handleCoverPhotoChange(e)}
                />
            </div>
            <div className="form-group">
                <button className="btn-submit" onClick={submit}>submit</button>
            </div>
        </div>
    );
}

export default AddAlbumForm;