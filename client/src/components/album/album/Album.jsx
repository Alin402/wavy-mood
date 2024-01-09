import "./Album.css";
import { useEffect, useState } from "react";
import { MdLibraryMusic as AlbumIcon } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { getArtistProfile } from "../../../actions/profile";
import Song from "../../songs/Song";
import AreYouSureModal from "../../generic/modal/AreYouSureModal";
import {
    deleteAlbum
} from "../../../actions/album";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { api } from "../../../utils/api";
import { setAlert } from "../../../actions/alert";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

const Album = ({ album }) => {
    const [profile, setProfile] = useState({})
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const getProfile = async () => {
            if (album.profileId) {
                try {
                    const res = await api.get(`/profile/artist/one/${album.profileId}`)
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
    }, [album])

    const handleDeleteAlbum = () => {
        dispatch(deleteAlbum(album._id, () => {
            setOpenDeleteModal(false);
            navigate("/profile");
        }))
    }

    return !album ? <h2>Loading...</h2> : 
    (
        <>
            <div className="album-container">
                <div className="album-header retro-style">
                    <div>
                        {
                            !album.coverPhotoUrl ?
                            <div className="missing-album-picture retro-style">
                                <AlbumIcon size={100} />
                            </div> :
                            <LazyLoadImage className="profile-image retro-style"
                                src={album.coverPhotoUrl}
                                effect="opacity"
                            />
                        }
                    </div>
                    <div className="title-container">
                        <h2 className="album-title">{album.name}</h2>
                        <NavLink to={`/artist/${album.profileId}`} style={{ color: "black" }}>
                            <p className="profile-artist">{profile?.username}</p>
                        </NavLink>
                        {
                            album.profileId === profile.id &&
                            <button className="btn-submit" onClick={() => setOpenDeleteModal(true)}>delete</button>
                        }
                    </div>
                </div>

                <div className="songs-container">
                    {
                        album?.songs?.length !== 0 && album?.songs?.map((song, index) => {
                            return (
                                <Song
                                    key={index}
                                    song={song}
                                    album={album}
                                />
                            )
                        })
                    }
                </div>
            </div>
            <AreYouSureModal 
                open={openDeleteModal}
                setOpen={setOpenDeleteModal}
                color="#ef5aa0"
                message={`Are you sure you want to delete album ${album.name}?`}
                action={handleDeleteAlbum}
            />
            <div style={{ height: "2rem" }}>

            </div>
        </>
    );
}

export default Album;