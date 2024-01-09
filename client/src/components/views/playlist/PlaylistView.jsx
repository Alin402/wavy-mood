import "./PlaylistView.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
    PLAYLIST_ERROR
} from "../../../actions/types";
import { api } from "../../../utils/api";
import { setAlert } from "../../../actions/alert";
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import Moment from "react-moment";
import PlaylistSong from "../../songs/PlaylistSong";

const PlaylistView = () => {
    const location = useLocation();
    const [playlist, setPlaylist] = useState({});

    const dispatch = useDispatch();

    useEffect(() => {
        let url = location.pathname;
        let lastIndex = url.lastIndexOf('/');
        let substring = url.substring(lastIndex + 1);

        const getPlaylist = async () => {
            if (substring) {
                try {
                    const res = await api.get(`/playlist/one/${substring}`)
                    if (res.data?.playlist) {
                        setPlaylist(res.data.playlist);
                    }
                } catch (err) {
                    const errors = err.response?.data.errors;
    
                    if (errors) {
                        errors.forEach((error) => dispatch(setAlert({ msg: error.msg, type: 'error' })));
                    }
    
                    dispatch({
                        type: PLAYLIST_ERROR
                    });
                }
            }
        }

        getPlaylist();
    }, [])

    return !playlist ? <h2>loading...</h2> :
    (
        <LazyLoadComponent>
            <div className="playlist-view retro-style">
                    <h2 className="playlist-title">
                        {playlist.name}
                    </h2>
                    <p className="playlist-date" style={{ fontSize: "1.5em", color: "#d3d3d3" }}>
                        <Moment fromNow>
                            {playlist.createdAt}
                        </Moment>
                    </p>

                    <p className="playlist-description">
                        {playlist.description}
                    </p>
                    {
                        playlist.songs?.length !== 0 && playlist.songs?.map((song, index) => {
                            return (
                                <PlaylistSong
                                    song={song}
                                    playlist={playlist}
                                />
                            )
                        })
                    }
            </div>
        </LazyLoadComponent>
    )
}

export default PlaylistView;