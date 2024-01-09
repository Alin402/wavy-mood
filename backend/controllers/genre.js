const asyncHandler = require("express-async-handler");
const Genre = require("../models/genre");

const getAllGenres = asyncHandler(async (req, res) => {
    try {
        const genre = await Genre.findOne();
        if (genre.genres.length === 0) {
            return res.status(404).json({ errors: [{ msg: "No genres found" }] })
        }
        return res.status(200).json({ genres: genres.genres });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
})

const searchGenre = asyncHandler(async (req, res) => {
    try {
        let field = req.body.field;
        if (!field) {
            return res.status(400).json({ errors: [ { msg: "Search field is required" } ] })
        }
        const genres = await Genre.find();
        let filteredGenres = genres.filter((genre) => {
            return genre.name.toLowerCase().includes(field.toLowerCase());
        })
        return res.status(200).json({ results: filteredGenres });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
})

module.exports = {
    getAllGenres,
    searchGenre
}
