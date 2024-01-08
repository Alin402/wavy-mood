import { useState, useEffect } from "react";
import "../Profile.css";
import { BiSolidPhotoAlbum as PhotoIcon } from "react-icons/bi";
import ArtistProfileForm from "./ArtistProfileForm";
import ArtistProfileGenres from "./ArtistProfileGenres";
import ImageUpload from "../image-upload/ImageUpload";
import { editArtistProfile, getArtistProfile } from "../../../../actions/profile";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ArtistProfile = ({ user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const profile = useSelector((state) => state.profile.profile);
    const loadingProfile = useSelector((state) => state.profile.loading);

    const [previewProfilePhoto, setPreviewProfilePhoto] = useState("");
    const [previewCoverPhoto, setPreviewCoverPhoto] = useState("");
    const [hasProfile, setHasProfile] = useState(false);

    const [formData, setFormData] = useState({
        username: "",
        profilePhotoUrl: "",
        coverPhotoUrl: "",
        genres: []
    })

    useEffect(() => {
        if (user?.hasProfile) {
            dispatch(getArtistProfile((profile) => {
                setFormData({
                    username: profile.username,
                    profilePhotoUrl: profile.profilePhotoUrl || "",
                    coverPhotoUrl: profile.coverPhotoUrl || "",
                    genres: profile.genres || []
                })
            }));
        }
    }, [hasProfile])

    const addGenre = (genre) => {
        let genres = formData.genres;
        if (genres.includes(genre)) {
            return;
        }
        genres = [...genres, genre];
        setFormData({ ...formData, genres });
    }

    const removeGenre = (genre) => {
        let genres = formData.genres;
        let index = genres.indexOf(genre);

        if (index !== -1) {
            genres.splice(index, 1);
        }

        setFormData({ ...formData, genres });
    }

    const handleUsernameChange = (e) => {
        setFormData({ ...formData, username: e.target.value });
    }

    const handleProfilePhotoChange = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setPreviewProfilePhoto(reader.result);
            setFormData({ ...formData, profilePhotoUrl: reader.result })
        }
        reader.onerror = (error) => {
            console.log(error);
        }
    }

    const handleCoverPhotoChange = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setPreviewCoverPhoto(reader.result);
            setFormData({ ...formData, coverPhotoUrl: reader.result })
        }
        reader.onerror = (error) => {
            console.log(error);
        }
    }

    const submitProfile = () => {
        dispatch(editArtistProfile(formData, (profile) => {
            navigate("/profile")
        }));
    }

    return user && user.hasProfile && (
        <div className="artist-profile">
                        <label htmlFor="coverPhotoUrl" style={{ cursor: "pointer" }}>
                            <div 
                                className="cover-photo"
                                style={{ backgroundImage: `url(${formData.coverPhotoUrl})` }}
                            >
                                {
                                    !formData.coverPhotoUrl &&
                                    <div className="missing-cover-photo">
                                        <PhotoIcon size={150} color={"#A9A9A9"} />
                                        <h2>Please select a cover photo</h2>
                                    </div>
                                }
                            </div>
                        </label>
                        <input 
                            accept="image/*"
                            style={{ display: "none" }} 
                            type="file" 
                            name="coverPhotoUrl" 
                            id="coverPhotoUrl"
                            onChange={(e) => handleCoverPhotoChange(e)}
                        />
                        <div className="form-profile-container" style={{ marginTop: "2rem" }}>
                            <div className="form-profile-forms">
                                <ArtistProfileForm
                                    username={formData.username}
                                    handleUsernameChange={handleUsernameChange}
                                />
                            </div>
                            <div>
                                <div className="submit-div">
                                    <div className="form-group">
                                        <label htmlFor="profilePhotoUrl" style={{ cursor: "pointer" }}>
                                            <ImageUpload
                                                image={formData.profilePhotoUrl}
                                            />
                                            <p className="form-label">choose a profile picture</p>
                                        </label>
                                        <input 
                                            accept="image/*"
                                            style={{ display: "none" }} 
                                            type="file" 
                                            name="profilePhotoUrl" 
                                            id="profilePhotoUrl"
                                            onChange={(e) => handleProfilePhotoChange(e)}
                                        />
                                    </div>
                                </div>

                                <div className="retro-style submit-profile" onClick={submitProfile}>
                                    <h2>edit profile</h2>
                                </div>
                            </div>
                            <div className="form-profile-forms">
                                <ArtistProfileGenres
                                    genres={formData.genres}
                                    addGenre={addGenre}
                                    removeGenre={removeGenre}
                                />
                            </div>
                        </div>
                    </div>
    )
}

export default ArtistProfile;