import "./AlbumList.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllAlbums
} from "../../../actions/album";
import Album from "./Album";
import { NavLink } from "react-router-dom";

const AlbumList = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user.user);
    const albums = useSelector((state) => state.album.albums);
    const loadingAlbums = useSelector((state) => state.album.loading);
    const [inDeleteMode, setInDeleteMode] = useState(false);

    useEffect(() => {
        dispatch(getAllAlbums());
    }, [])

    const toggleDeleteMode = () => {
        setInDeleteMode(!inDeleteMode);
    }

    return loadingAlbums ?
    <h2>loading...</h2>
    : (
        <div>
            <button className="btn-delete retro-style" style={{ backgroundColor: inDeleteMode ? "#b90e0a" : "#ef5aa0", marginRight: ".5rem" }} onClick={toggleDeleteMode}>
                {
                    inDeleteMode ?
                    "Cancel":
                    "Delete an album"
                }
            </button>
            <div className="album-list" style={{ marginBottom: "2rem" }}>
                {
                    albums.length === 0 ?
                    <h2>no albums to display...</h2> :
                    
                    (
                        <div className="album-list-container">
                            {
                                albums?.map((album, index) => {
                                    return (
                                        <Album 
                                            key={index}
                                            album={album}
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

export default AlbumList;