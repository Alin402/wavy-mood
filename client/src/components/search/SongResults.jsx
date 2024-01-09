import "./Search.css";
import Song from "../songs/Song";
import { api } from "../../utils/api";

const SongResults = ({ results }) => {
    return (
        <div className="search-results">
            {
                results?.length !== 0 && results?.map((song, index) => {
                    return <Song key={index} song={song} />  
                })
            }
        </div>
    )
}

export default SongResults;