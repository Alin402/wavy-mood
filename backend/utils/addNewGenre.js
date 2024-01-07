const Genre = require("../models/genre");

const addNewGenre = async (genreName, userId) => {
    try {
        let genre = await Genre.findOne({ name: genreName });
        if (!genre) {
            let genre = new Genre({ name: genreName, addedBy: userId });
            await genre.save();
        }
        return;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    addNewGenre
}
