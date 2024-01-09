import "../Songs.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMusicalNotes as SongIcon } from "react-icons/io5";
import {
    getAllAlbums,
    uploadSong
} from "../../../actions/album";
import { useNavigate } from "react-router-dom";
import { api } from "../../../utils/api";

const SongUpload = ({ setOpenModal }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const albums = useSelector((state) => state.album.albums);
    const loadingAlbums = useSelector((state) => state.album.loading);

    const [formData, setFormData] = useState({
        albumId: null,
        name: "",
        duration: 12,
        file: null
    })

    const [fileName, setFileName] = useState("");

    useEffect(() => {
        dispatch(getAllAlbums());
    }, [])

    const handleFileChange = (e) => {
        setFormData({ ...formData, file: e.target.files[0] })
        setFileName(e.target.files[0].name)
    }

    const handleNameChange = (e) => {
        setFormData({ ...formData, name: e.target.value })
    }

    const handleAlbumChange = (e) => {
        setFormData({ ...formData, albumId: e.target.value })
    }

    const submit = async () => {
        let fd = new FormData();
        fd.append("albumId", formData.albumId);
        fd.append("name", formData.name);
        fd.append("file", formData.file );
        fd.append("duration", formData.duration);
        dispatch(uploadSong(fd, navigate, setOpenModal));
    }

    return (
        <div>
            <div className="form-group">
                <label className="form-label" htmlFor="name">name of the song:</label>
                <input autoFocus type="text" className="form-input" id="name" name="name" onChange={(e) => handleNameChange(e)}></input>
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="album">album to upload song to:</label>
                <select className="form-input" id="album" name="album" onChange={(e) => handleAlbumChange(e)}>
                    <option></option>
                    {
                        loadingAlbums ?
                        <h2>loading...</h2> :
                        albums?.length && albums.map((album, index) => {
                            return (
                                <option key={index} value={album._id}>{album.name}</option>
                            )
                        })
                    }
                </select>
            </div>

            <div className="form-group">
                <label className="form-label" htmlFor="fileUrl">
                    choose the mp3 file for your song:
                    <div className="retro-style song-upload-input">
                        <SongIcon size={30} />
                    </div>
                </label>
                <input 
                    style={{ display: "none" }} 
                    accept=".mp3" type="file" 
                    className="form-input" 
                    id="fileUrl" 
                    name="fileUrl"
                    onChange={(e) => handleFileChange(e)}
                >
                </input>
                <div style={{ width: "25rem" }}>
                    <h2>
                        {
                            fileName
                        }
                    </h2>
                </div>
            </div>
            <div className="form-group">
                <button className="btn-submit" onClick={submit}>upload</button>
            </div>
        </div>
    )
}

export default SongUpload;