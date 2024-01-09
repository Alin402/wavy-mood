import "./Songs.css";
import { useState, useEffect } from "react";
import { FaCirclePlay as PlayIcon } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
    addSOngInQueue,
    setCurrentSong,
    setQueue
} from "../../actions/songQueue";
import { api } from "../../utils/api";
import { NavLink } from "react-router-dom";
import { SiAudiomack as PlayingIcon } from "react-icons/si";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import AddSongToPlaylist from "./AddSongToPlaylist";

const PlaylistSong = ({ song, playlist }) => {
    const dispatch = useDispatch();
    const [album, setAlbum] = useState({});
    const currentSong = useSelector((state) => state.songQueue.currentSong);
    const user = useSelector((state) => state.user.user.user);

    useEffect(() => {
        const getAlbum = async () => {
            let res = await api.get(`/album/one/${song.albumId}`)
            if (res.data?.album) {
                setAlbum(res.data.album);
            }
        }
        getAlbum();
    }, [song])

    const handlePlaySong = () => {
        dispatch(setCurrentSong(song));
        dispatch(setQueue(playlist.songs));
    }

    return  album && (
        <div className="song retro-style" style={{ backgroundColor: "#fff", color: "#000" }}>
            <div className="photo-and-name">
                {
                    !album.coverPhotoUrl ?
                    <div className="followed-artist-profile-image retro-style"></div> :
                    <LazyLoadImage
                        className="retro-style followed-artist-profile-image"
                        src={album.coverPhotoUrl}
                        effect="opacity"
                    />
                }
                <div style={{ marginLeft: "1rem" }}>
                    <h2 className="song-title" style={{ color: "#000" }}>
                        { song.name }
                    </h2>
                    <NavLink to={`/album/${album._id}`} style={{ color: "#000" }}>
                        <h3>
                            { album.name }
                        </h3>
                    </NavLink>
                </div>
            </div>
            <div style={{ display: "flex" }}>
                {
                    currentSong._id === song._id ?
                    <PlayingIcon color="#ef5aa0" size={50} className="play-icon" /> :
                    <PlayIcon color="#ef5aa0" size={50} className="play-icon" onClick={handlePlaySong} />
                }
                {
                    !user.isArtist &&
                    <AddSongToPlaylist song={song} />
                }
            </div>
        </div>
    )
}

export default PlaylistSong;