import { useState } from "react";
import "../Profile.css";
import { AiFillPlusSquare as PlusIcon } from "react-icons/ai";
import { MdCancel as CancelIcon } from "react-icons/md";

const ArtistProfileGenres = ({ genres, addGenre, removeGenre }) => {
    const [genre, setGenre] = useState("");

    const submit = () => {
        if (genre) {
            addGenre(genre);
            setGenre("");
        }
    }
    return (
        <div style={{ position: "relative" }}>
            <div className='signup'>
                <h2 className="signup-title" style={{ fontSize: "3.5em" }}>choose your genres</h2>
                <div className="form-group">
                    <label className="form-label" htmlFor="genre">type in your genres</label>
                    <div className="genres-input">
                        <input value={genre} className="form-input" id="genre" name="genre" onChange={(e) => { setGenre(e.target.value) }}></input>
                        <div className="plus-icon-cont" onClick={submit}>
                            <PlusIcon size={45} />
                        </div>
                    </div>
                </div>
                <div className="genres-container">
                    {
                        genres.length !== 0 && genres.map((genre, index) => {
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

export default ArtistProfileGenres;