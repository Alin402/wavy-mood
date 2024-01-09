import { useState } from "react";
import "../Profile.css";
import { AiFillPlusSquare as PlusIcon } from "react-icons/ai";
import { MdCancel as CancelIcon } from "react-icons/md";
import {api } from "../../../../utils/api";

const SearchGenres = ({ addGenre, removeGenre, favoriteGenres }) => {
    const [field, setField] = useState("");
    const [results, setResults] = useState([]);

    const getSearchResults = async (field) => {
        try {
            let res = await api.post("/genre/search", { field });
            if (res.data) {
                setResults(res.data.results);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleFieldChange = (e) => {
        setField(e.target.value);
        if (e.target.value.length > 2) {
            getSearchResults(e.target.value);
        } else {
            setResults([]);
        }
    }

    return (
        <div style={{ position: "relative" }}>
            <div className='signup'>
                <h2 className="signup-title" style={{ fontSize: "3.5em" }}>search your favorite genres</h2>
                <div className="form-group">
                    <label className="form-label" htmlFor="genre">type in your genres (min. 3 characters)</label>
                    <div className="genres-input">
                        <input className="form-input" id="search" name="search" value={field} onChange={(e) => handleFieldChange(e)}></input>
                    </div>
                </div>
                <div className="results-container-genre">
                    {
                        results.length !== 0 && results.map((genre, index) => {
                            return (
                                <div className="result-genre retro-style" key={index} onClick={() => addGenre(genre.name)}>
                                    <h2>{genre.name}</h2>
                                    <PlusIcon size={30} style={{ cursor: "pointer" }} />
                                </div>
                            )
                        })
                    }
                </div>

                <div className="genres-container" style={{ marginTop: "2rem" }}>
                    {
                        favoriteGenres.length !== 0 && favoriteGenres.map((genre, index) => {
                            return (
                                <div className="genre" key={index}>
                                    {genre}
                                    <CancelIcon 
                                        style={{ cursor: "pointer" }}
                                        onClick={() => removeGenre(genre)}
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

export default SearchGenres;