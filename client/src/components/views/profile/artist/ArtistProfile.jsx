import { useState, useEffect } from "react";
import "../Profile.css";
import { BiSolidPhotoAlbum as PhotoIcon } from "react-icons/bi";
import ArtistProfileForm from "./ArtistProfileForm";
import ArtistProfileGenres from "./ArtistProfileGenres";
import ImageUpload from "../image-upload/ImageUpload";
import { createArtistProfile, getArtistProfile } from "../../../../actions/profile";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AlbumList from "../../../album/album-list/AlbumList";
import { NavLink } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

const ArtistProfile = ({ user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const profile = useSelector((state) => state.profile.profile);
    const loadingProfile = useSelector((state) => state.profile.loading);

    const [previewProfilePhoto, setPreviewProfilePhoto] = useState("");
    const [previewCoverPhoto, setPreviewCoverPhoto] = useState("");
    const [hasProfile, setHasProfile] = useState(false);

    useEffect(() => {
        if (user?.hasProfile) {
            dispatch(getArtistProfile((profile) => {}));
        }
    }, [hasProfile])

    const [formData, setFormData] = useState({
        username: "",
        profilePhotoUrl: "",
        coverPhotoUrl: "",
        genres: []
    })

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
        console.log(formData)
        dispatch(createArtistProfile(formData, navigate, setHasProfile));
    }

    return (
        <div className="artist-profile">
            {
                (user.hasProfile && !loadingProfile) || (hasProfile) ?
                <div>
                    {
                        !profile.coverPhotoUrl ?
                        <div
                            className="cover-photo-artist-view retro-style"
                            loading="lazy"
                        >
                            <div className="missing-cover-photo">
                                <PhotoIcon size={150} color={"#A9A9A9"} />
                            </div>
                        </div> :
                        <LazyLoadImage 
                            className="cover-image retro-style" 
                            src={profile.coverPhotoUrl} 
                            effect="opacity"
                            width="100%"
                        />
                    }
                    <div className="created-profile retro-style" style={{ marginTop: "2rem" }}>
                        <div className="margin-top">
                            <div 
                                className="retro-style profile-image"
                                style={{
                                    backgroundImage: `url(${profile.profilePhotoUrl})`,
                                    backgroundColor: "#d3d3d3"
                                }}
                            >
                                {
                                    !profile.profilePhotoUrl &&
                                    <div className="center">
                                        <PhotoIcon size={100} />
                                    </div>    
                                }
                            </div>
                        </div>

                        <div className="created-profile-right">
                            <div>
                                <h2 className="username-title">{profile.username}</h2>
                                <h2 className="followers-count">followers: <span className="followers-number">{profile.noFollowers}</span></h2>
                            </div>   
                            <div className="genres-container" style={{ marginBottom: "1rem" }}>
                                {
                                    profile.favotiteGenres?.length !== 0 && profile.genres?.map((genre, index) => {
                                        return (
                                            <div className="genre" key={index}>
                                                {genre}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div>
                                {
                                    user?.hasProfile &&
                                    <NavLink to="/profile/edit" >
                                        <button className="retro-style btn-edit">Edit profile</button>
                                    </NavLink>
                                }
                            </div>
                        </div>
                    </div>
                    <div style={{ marginTop: "2rem" }}>
                        <AlbumList />
                    </div>
                </div> :
                (
                    <>
                        <label htmlFor="coverPhotoUrl" style={{ cursor: "pointer" }}>
                            <div
                                className="cover-photo"
                                style={{ backgroundImage: `url(${previewCoverPhoto})` }}
                            >
                                {
                                    !previewCoverPhoto &&
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
                                                image={previewProfilePhoto}
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
                                    <h2>submit profile</h2>
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
                    </>
                )
            }
        </div>
    )
}

export default ArtistProfile;