import "../Playlist.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllPlaylists
} from "../../../actions/playlist";
import Playlist from "./Playlist";
import { NavLink } from "react-router-dom";

const PlaylistList = () => {
    const dispatch = useDispatch();
    const playlists = useSelector((state) => state.playlist.playlists);
    const loadingPlaylists = useSelector((state) => state.playlist.loading);
    const [inDeleteMode, setInDeleteMode] = useState(false);

    useEffect(() => {
        dispatch(getAllPlaylists());
    }, [])

    const toggleDeleteMode = () => {
        setInDeleteMode(!inDeleteMode);
    }

    return loadingPlaylists ?
    <h2>loading...</h2>
    : (
        <div>
            <button className="btn-delete retro-style" style={{ backgroundColor: inDeleteMode ? "#b90e0a" : "#ef5aa0", marginRight: ".5rem" }} onClick={toggleDeleteMode}>
                {
                    inDeleteMode ?
                    "Cancel":
                    "Delete a playlist"
                }
            </button>
            <div className="playlist-list" style={{ marginBottom: "2rem" }}>
                <h2 className="signup-title">your playlists</h2>
                {
                    playlists.length === 0 ?
                    <h2>no playlists to display...</h2> :
                    
                    (
                        <div className="album-list-container">
                            {
                                playlists?.map((playlist, index) => {
                                    return (
                                        <Playlist 
                                            key={index}
                                            playlist={playlist}
                                            inDeleteMode={inDeleteMode}
                                            setInDeleteMode={setInDeleteMode}
                                        />
                                    )
                                })
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default PlaylistList;