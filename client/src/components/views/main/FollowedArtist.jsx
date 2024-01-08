import { useState, useEffect } from "react";
import "./MainView.css";
import { NavLink } from "react-router-dom";
import { api } from "../../../utils/api";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

const FollowedArtist = ({ artistId }) => {
    const [artist, setArtist] = useState(null);
    useEffect(() => {
        const getArtist = async () => {
            if (artistId) {
                try {
                    let res = await api.get(`/profile/artist/one/${artistId}`)
                    if (res.data?.artist) {
                        setArtist(res.data.artist)
                    }
                } catch (error) {
                    console.log(error)
                    return null;
                }
            }
        }
        getArtist();
    }, [artistId])
    return  artist && (
        <div className="followed-artist retro-style">
            {
                !artist.profilePhotoUrl ?
                <div className="followed-artist-profile-image retro-style"></div> :
                <LazyLoadImage
                    className="followed-artist-profile-image retro-style"
                    effect="opacity"
                    src={artist.profilePhotoUrl}
                />
            }
            <NavLink to={`/artist/${artist._id}`} style={{ color: "black", marginLeft: ".5rem" }}>
                <h2 className="followed-artist-title">
                    { artist.username }
                </h2>
            </NavLink>
        </div>
    )
}

export default FollowedArtist;