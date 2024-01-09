import "./Artist.css";
import { NavLink } from "react-router-dom";

const Artist = ({ artist }) => {
    return  artist && (
        <div className="artist retro-style">
            <NavLink to={`/artist/${artist._id}`}>
                <h2 className="artist-title">
                    { artist.username }
                </h2>
            </NavLink>
        </div>
    )
}

export default Artist;