import "../Playlist.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MdCancel as DeleteIcon } from "react-icons/md";
import AreYouSureModal from "../../generic/modal/AreYouSureModal";
import {
    deletePlaylist
} from "../../../actions/playlist";
import { useDispatch } from "react-redux";
import Moment from "react-moment";

const Playlist = ({ playlist, inDeleteMode, setInDeleteMode, showArtist }) => {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const dispatch = useDispatch();

    const handleOpenDeleteModal = () => {
        setOpenDeleteModal(true);
    }

    const handleDeletePlaylist = () => {
        dispatch(deletePlaylist(playlist._id, () => {
            setOpenDeleteModal(false);
            setInDeleteMode(false);
        }))
    }

    return (
        <>  
            <div className="playlist retro-style">
                {
                    inDeleteMode &&
                    <div className="delete-icon">
                        <DeleteIcon size={40} color={"#b90e0a"} onClick={handleOpenDeleteModal} />
                    </div>
                }
                <div>
                    <div style={{ marginLeft: "1rem" }}>
                        <Link to={`/playlist/${playlist._id}`} className="playlist-link">
                            <h2 style={{ marginTop: "1rem" }}>{playlist.name}</h2>
                        </Link>
                        <p className="playlist-date">
                            <Moment fromNow>
                                { playlist.createdAt }
                            </Moment>
                        </p>
                    </div>
                </div>
            </div>
            <AreYouSureModal 
                open={openDeleteModal}
                setOpen={setOpenDeleteModal}
                color="#ef5aa0"
                message={`Are you sure you want to delete playlist ${playlist.name}?`}
                action={handleDeletePlaylist}
            />
        </>
    )
}

export default Playlist;