import "./AlbumView.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
    ALBUM_ERROR
} from "../../../actions/types";
import { api } from "../../../utils/api";
import { setAlert } from "../../../actions/alert";
import Album from "../../album/album/Album";
import { addToRecentlyViewed } from "../../../utils/addToRecentlyViewed";
import { LazyLoadComponent } from 'react-lazy-load-image-component';

const AlbumView = () => {
    const location = useLocation();
    const [albumId, setAlbumId] = useState(null)
    const [album, setAlbum] = useState({});

    const dispatch = useDispatch();

    useEffect(() => {
        let url = location.pathname;
        let lastIndex = url.lastIndexOf('/');
        let substring = url.substring(lastIndex + 1);
        setAlbumId(substring);

        const getAlbum = async () => {
            if (substring) {
                try {
                    const res = await api.get(`/album/one/${substring}`)
                    if (res.data?.album) {
                        setAlbum(res.data.album);
                        addToRecentlyViewed(res.data?.album);
                    }
                } catch (err) {
                    const errors = err.response?.data.errors;
    
                    if (errors) {
                        errors.forEach((error) => dispatch(setAlert({ msg: error.msg, type: 'error' })));
                    }
    
                    dispatch({
                        type: ALBUM_ERROR
                    });
                }
            }
        }

        getAlbum();
    }, [])

    return !album ? <h2>loading...</h2> :
    (
        <div className="album-view">
            <LazyLoadComponent>
                <Album
                    album={album}
                />
            </LazyLoadComponent>
        </div>
    )
}

export default AlbumView;