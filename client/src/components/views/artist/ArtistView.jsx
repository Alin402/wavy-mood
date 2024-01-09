import "./ArtistView.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../../utils/api";
import { setAlert } from "../../../actions/alert";
import { BiSolidPhotoAlbum as PhotoIcon } from "react-icons/bi";
import AlbumListView from "../../album/album-list/AlbumListView";
import { followArist } from "../../../actions/profile";
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

const ArtistView = () => {
    const location = useLocation();
    const [profile, setProfile] = useState({});

    const user = useSelector((state) => state.user.user.user);

    const dispatch = useDispatch();

    useEffect(() => {
        let url = location.pathname;
        let lastIndex = url.lastIndexOf('/');
        let substring = url.substring(lastIndex + 1);
        setProfile(substring);

        const getProfile = async () => {
            if (substring) {
                try {
                    const res = await api.get(`/profile/artist/one/${substring}`)
                    if (res.data?.artist) {
                        setProfile(res.data.artist);
                    }
                } catch (err) {
                    const errors = err.response?.data.errors;
    
                    if (errors) {
                        errors.forEach((error) => dispatch(setAlert({ msg: error.msg, type: 'error' })));
                    }
                }
            }
        }
        getProfile();
    }, [])

    const handleFollowArist = () => {
        dispatch(followArist(profile._id, (profile) => {}))
    }

    return !profile ?
    <div>
        <h2>loading...</h2>
    </div> :
     (
        <div className="artist-view-container" style={{ marginTop: "2rem" }}>
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
            <div style={{ display: "flex" }}>
            <div className="created-profile retro-style" style={{ marginTop: "2rem" }}>
                        <div className="margin-top">
                            {
                                !profile.profilePhotoUrl?
                                <div 
                                    className="retro-style profile-image"
                                    style={{
                                        backgroundColor: "#d3d3d3",
                                    }}
                                >
                                    <div className="center">
                                        <PhotoIcon size={100} />
                                    </div>
                                </div> :
                                <LazyLoadImage
                                    src={profile.profilePhotoUrl}
                                    effect="opacity"
                                    className="retro-style"
                                    width="300"
                                    height="300"
                                />
                            }
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
                            {
                                !user.isArtist &&
                                <button className="btn-delete retro-style" onClick={handleFollowArist}>
                                    follow
                                </button>
                            }
                        </div>
                    </div>
                    <div style={{ padding: "1rem 2rem" }}>
                        <LazyLoadComponent>
                            <AlbumListView profile={profile} />
                        </LazyLoadComponent>
                    </div>
            </div>
                </div>
    )
}

export default ArtistView;