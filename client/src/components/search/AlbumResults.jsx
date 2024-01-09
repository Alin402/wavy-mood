import "./Search.css";
import Album from "../album/album-list/Album";

const AlbumResults = ({ results }) => {
    return (
        <div className="search-results">
            {
                results.length !== 0 && results.map((album, index) => {
                    return <Album showArtist={true} key={index} album={album} />
                })
            }
        </div>
    )
}

export default AlbumResults;