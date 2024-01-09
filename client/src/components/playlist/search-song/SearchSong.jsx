import "../Playlist.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { api } from "../../../utils/api";
import { setAlert } from "../../../actions/alert";
import Song from "../../songs/Song";
import { AiFillPlusSquare as PlusIcon } from "react-icons/ai";
import { MdCancel as CancelIcon } from "react-icons/md";

const SearchSong = ({ addSong }) => {
    const dispatch = useDispatch();
    const [field, setField] = useState("");
    const [results, setResults] = useState([]);

    const getSearchResults = async (callback) => {
        try {
            const res = await api.get(`/search/song/${field}`);
        
            if (res.data?.songs) {
                callback(res.data.songs)
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
        search(e.target.value);
    }

    return (
        <>
            <label className="form-label-white" htmlFor="search">search a song</label>
            <input value={field} className="form-input" id="search" name="search" onChange={(e) => handleSearch(e)} style={{ position: "relative" }}></input>
            {
                results?.length &&
                    <div className="results-container-playlist">
                        {
                            results.map((result, index) => {
                                return (
                                    <div key={index} style={{ display: "flex" }}>
                                        <Song song={result} />
                                        <PlusIcon onClick={() => addSong(result)} className="add-song" size={100} />
                                    </div>
                                )
                            })
                        }
                    </div>
            }
        </>
    )
}

export default SearchSong;