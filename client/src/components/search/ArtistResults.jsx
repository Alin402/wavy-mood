import "./Search.css";
import FollowedArtist from "../views/main/FollowedArtist";

const ArtistResults = ({ results }) => {
    return (
        <div className="search-results">
            {
                results.length !== 0 && results.map((artist, index) => {
                    return <FollowedArtist key={index} artistId={artist._id} />
                })
            }
        </div>
    )
}

export default ArtistResults;