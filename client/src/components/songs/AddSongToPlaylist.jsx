import "./Songs.css";
import { useState, useEffect } from "react";
import { AiFillPlusSquare as PlusIcon } from "react-icons/ai";
import { RiCloseFill as CloseIcon } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { getAllPlaylists } from "../../actions/playlist";
import { addSongToPlaylist } from "../../actions/playlist";

const PlaylistDropdown = ({ song, setOpenDropdown, playlists }) => {
    const dispatch = useDispatch();

    const handleAddSongToPlaylist = (songId, albumId, playlistId) => {
        const formData = { songId, albumId, playlistId }
        console.log(formData)
        dispatch(addSongToPlaylist(formData, (playlist) => {
            setOpenDropdown(false);
        }))
    }

    return playlists && (
        <div className="playlist-dropdown retro-style">
            <h2>add to playlist:</h2>
            <div style={{ marginTop: ".5rem" }}>
                {
                    playlists?.length !== 0 ? playlists?.map((playlist, index) => {
                        return (
                            <div className="playlist-dropdown-playlist retro-style" onClick={() => handleAddSongToPlaylist(song._id, song.albumId, playlist._id)}>
                                {playlist.name}
                            </div>
                        )
                    }) :
                    <p>you have no playlists</p>
                }
            </div>
        </div>
    )
}

const AddSongToPlaylist = ({ song }) => {
    const [openDropdown, setOpenDropdown] = useState(false);

    const dispatch = useDispatch();
    const playlists = useSelector((state) => state.playlist.playlists);

    useEffect(() => {
        dispatch(getAllPlaylists(() => {}))
    }, [])

    const handleOpenDropdown = () => {
        setOpenDropdown(!openDropdown);
    }
    return (
        <>  
            <div style={{ position: "relative" }}>
                <div>
                    {
                        openDropdown ?
                        <CloseIcon onClick={handleOpenDropdown} color="#ef5aa0" size={50} className="play-icon" /> :
                        <PlusIcon onClick={handleOpenDropdown} color="#ef5aa0" size={50} className="play-icon" />
                    }
                </div>
                {
                    openDropdown &&
                    <PlaylistDropdown 
                        song={song} 
                        setOpenDropdown={setOpenDropdown} 
                        playlists={playlists}
                    />
                }
            </div>
        </>
    )
}

export default AddSongToPlaylist;