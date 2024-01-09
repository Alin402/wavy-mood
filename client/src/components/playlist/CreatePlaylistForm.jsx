import "./Playlist.css";
import { useState } from "react";
import SearchSong from "./search-song/SearchSong";
import { MdCancel as CancelIcon } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
    createPlaylist
} from "../../actions/playlist";

const CreatePlaylistForm = ({ setOpenModal }) => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        songs: []
    });

    const [previewSongs, setPreviewSongs] = useState([]);

    const handleNameChange = (e) => {
        setFormData({ ...formData, name: e.target.value });
    }

    const handleDescriptionChange = (e) => {
        setFormData({ ...formData, description: e.target.value });
    }

    const submit = () => {
        dispatch(createPlaylist(formData, (playlist) => {
            setOpenModal(false);
        }))
    }

    const addSong = (song) => {
        let songs = formData.songs;
        if (songs.find((s) => s._id === song._id)) {
            return;
        }
        songs = [...songs, song];
        setFormData({ ...formData, songs });
        setPreviewSongs([...previewSongs, song])
    }

    const removeSong = (song) => {
        let songs = formData.songs;
        let psongs = previewSongs;
        let index = songs.indexOf(song);

        if (index !== -1) {
            songs.splice(index, 1);
            psongs.splice(index, 1);
        }

        setFormData({ ...formData, songs });
        setPreviewSongs(psongs);
    }

    return (
        <div className="create-playlist-container">
            <div>
                <div className="form-group">
                    <label className="form-label-white" htmlFor="name" style={{ marginTop: "1rem" }}>name of the playlist</label>
                    <input onChange={(e) => handleNameChange(e)} autoFocus className="form-input" id="name" name="name"></input>
                </div>

                <div className="form-group">
                    <label className="form-label-white" htmlFor="description">description of the playlist (optional)</label>
                    <textarea onChange={(e) => handleDescriptionChange(e)} className="form-input" id="description" name="description" style={{ height: "10rem", paddingTop: "1rem" }} />
                </div>

                <div className="form-group">
                    <SearchSong
                        addSong={addSong}
                    />
                </div>

                <div className="form-group">
                    <button onClick={submit} className="btn-submit">submit</button>
                </div>
            </div>
            <div style={{ marginLeft: "2rem", width: "20rem", marginTop: "2rem" }}>
                <label className="form-label-white">songs for playlist:</label>
                <div className="songs-to-add-container" style={{ marginTop: ".2rem" }}>
                    {
                        previewSongs?.length !== 0 && previewSongs.map((song, index) => {
                            return (
                                <div key={index} className="song-to-add retro-style">
                                    <p className="song-to-add-name">{song.name}</p>
                                    <CancelIcon
                                        size={25}
                                        className="remove-song-icon"
                                        onClick={() => removeSong(song)}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default CreatePlaylistForm;