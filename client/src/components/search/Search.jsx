import "./Search.css";
import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import { useDispatch } from "react-redux";
import { setAlert } from "../../actions/alert";
import AlbumResults from "./AlbumResults";
import SongResults from "./SongResults";
import ArtistResults from "./ArtistResults";

const SearchResults = ({ 
    results,
    searchBy
 }) => {
    if (results.length !== 0) {
        switch (searchBy) {
            case "album":
                return <AlbumResults results={results} />
            case "song":
                return <SongResults results={results} />
            case "artist":
                return <ArtistResults results={results} />
            default:
                return <h2>no results</h2>
        }
    }
}

const Search = () => {
    const [field, setField] = useState("")
    const [searchBy, setSearchBy] = useState("album");
    const [results, setResults] = useState([]);

    const dispatch = useDispatch();

    const getSearchResults = async (callback) => {
        try {
            const res = await api.get(`/search/${searchBy}/${field}`);
        
            if (res.data?.albums) {
                callback(res.data.albums)
            }

            if (res.data?.songs) {
                callback(res.data.songs)
            }

            if (res.data?.artists) {
                callback(res.data.artists)
            }
          } catch (err) {
            const errors = err.response.data.errors;
        
            if (errors) {
              errors.forEach((error) => dispatch(setAlert({ msg: error.msg, type: 'error' })));
            }
        }
    }

    const search = (searchField) => {
        if (searchField.length > 2) {
            getSearchResults((albums) => {
                setResults(albums);
            })
        } else {
            setResults([]);
        }
    }

    const handleSearch = (e) => {
        setField(e.target.value);
        search(e.target.value)
    }

    const handleChangeSearchBy = (e) => {
        setSearchBy(e.target.value);
        setResults([]);
        setField("");
    }

    return (
        <div>
            <div className="search-input-container">
                <div>
                    <input 
                        value={field}
                        style={{ width: "50rem" }} 
                        className="form-input search-input" 
                        id="field" 
                        name="field" 
                        placeholder="search..."
                        onChange={(e) => handleSearch(e)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSearch(e);
                            }
                        }}
                    />
                </div>
                <div>
                    <select value={searchBy} className="form-input search-select" onChange={(e) => handleChangeSearchBy(e)}>
                        <option value="album">album</option>
                        <option value="song">song</option>
                        <option value="artist">artist</option>
                    </select>
                </div>
            </div>
            {
                results.length !== 0 &&
                <div className="results-container retro-style">
                    <SearchResults results={results} searchBy={searchBy} />
                </div>
            }
        </div>
    )
}

export default Search;