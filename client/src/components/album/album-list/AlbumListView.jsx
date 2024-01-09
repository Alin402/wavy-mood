import "./AlbumList.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Album from "./Album";
import { NavLink } from "react-router-dom";
import { api } from "../../../utils/api";
import { setAlert } from "../../../actions/alert";

const AlbumList = ({ profile }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user.user);
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const getAlbums = async () => {
            if (profile._id) {
                try {
                    const res = await api.get(`/album/view/${profile._id}`)
                    if (res.data?.albums) {
                        setAlbums(res.data.albums);
                    }
                } catch (err) {
                    const errors = err.response?.data.errors;
    
                    if (errors) {
                        errors.forEach((error) => dispatch(setAlert({ msg: error.msg, type: 'error' })));
                    }
                }
            }
        }

        getAlbums();
    }, [profile])

    return (
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
                                    />
                                )
                            })
                        }
                    </div>
                )
            }
        </div>
    )
}

export default AlbumList;