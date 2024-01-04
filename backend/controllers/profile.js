const asyncHandler = require("express-async-handler");
const ArtistProfile = require("../models/artistProfile");
const User = require("../models/user");
const UserProfile = require("../models/userProfile");
const { validationResult } = require("express-validator");
const {
    addNewGenre
} = require("../utils/addNewGenre");

const createArtistProfile = asyncHandler(async (req, res) => {
    const { username, profilePhotoUrl, coverPhotoUrl, genres } = req.body;

    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let profile = await ArtistProfile.findOne({ userId: req.user.id });
        if (profile) {
            return res.status(409).json({ errors: [{ msg: "Profile already exists for this user" }] });
        }

        profile = { username, userId: req.user.id };

        if (profilePhotoUrl) {
            profile = { ...profile, profilePhotoUrl };
        }

        if (coverPhotoUrl) {
            profile = { ...profile, coverPhotoUrl };
        }

        if (genres) {
            profile = { ...profile, genres };
            genres.forEach((genre) => {
                addNewGenre(genre, req.user.id);
            })
        }

        let newProfile = new ArtistProfile(profile);

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ errors: [{ msg: "Cannot find user" }] });
        }
        user.hasProfile = true;
        await user.save();

        await newProfile.save();

        return res.status(200).json({ profile, user })

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
})

const getArtistProfile = asyncHandler(async (req, res) => {
    try {
        const profile = await ArtistProfile.findOne({ userId: req.user.id })
        if (!profile) {
            return res.status(404).json({ errors: [{ msg: "Profile not found" }] });
        }
        return res.status(200).json({ profile });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
})

const createNormalUserProfile = asyncHandler(async (req, res) => {
    const { username, profilePhotoUrl, favoriteGenres } = req.body;

    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let profile = await UserProfile.findOne({ userId: req.user.id });
        if (profile) {
            return res.status(409).json({ errors: [{ msg: "Profile already exists for this user" }] });
        }

        profile = { username, userId: req.user.id };

        if (profilePhotoUrl) {
            profile = { ...profile, profilePhotoUrl };
        }

        if (favoriteGenres) {
            profile = { ...profile, favoriteGenres };
        }

        let newProfile = new UserProfile(profile);

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ errors: [{ msg: "Cannot find user" }] });
        }
        user.hasProfile = true;
        await user.save();

        await newProfile.save();

        return res.status(200).json({ profile, user })

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
})

const getNormalUserProfile = asyncHandler(async (req, res) => {
    try {
        const profile = await UserProfile.findOne({ userId: req.user.id })
        if (!profile) {
            return res.status(404).json({ errors: [{ msg: "Profile not found" }] });
        }
        return res.status(200).json({ profile });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
})

const editArtistProfile = asyncHandler(async (req, res) => {
    const { username, profilePhotoUrl, coverPhotoUrl, genres } = req.body;

    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let profile = await ArtistProfile.findOne({ userId: req.user.id });
        if (!profile) {
            return res.status(404).json({ errors: [{ msg: "Profile not found" }] });
        }

        profile.username = username;

        if (profilePhotoUrl) {
            profile.profilePhotoUrl = profilePhotoUrl
        }

        if (coverPhotoUrl) {
            profile.coverPhotoUrl = coverPhotoUrl;
        }

        if (genres) {
            profile.genres = genres;
            genres.forEach((genre) => {
                addNewGenre(genre, req.user.id);
            })
        }

        await profile.save();

        return res.status(200).json({ profile })

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
})

const editNormalUserProfile = asyncHandler(async (req, res) => {
    const { username, profilePhotoUrl, favoriteGenres } = req.body;

    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let profile = await UserProfile.findOne({ userId: req.user.id });
        if (!profile) {
            return res.status(404).json({ errors: [{ msg: "Profile not found" }] });
        }

        profile.username = username;

        if (profilePhotoUrl) {
            profile.profilePhotoUrl = profilePhotoUrl
        }

        if (favoriteGenres) {
            profile.favoriteGenres = favoriteGenres;
        }

        await profile.save();

        return res.status(200).json({ profile })

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
})

const getArtistProfileView = asyncHandler(async (req, res) => {
    try {
        if (!req.params.artistId) {
            return res.status(404).json({ errors: [{ msg: "Artist id not found" }] });
        }
        const artist = await ArtistProfile.findOne({ _id: req.params.artistId })
        if (!artist) {
            return res.status(404).json({ errors: [{ msg: "Artist not found" }] });
        }
        return res.status(200).json({ artist });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
})

const followArtist = asyncHandler(async (req, res) => {
    try {
        let userProfile = await UserProfile.findOne({ userId: req.user.id });

        if (!userProfile) {
            return res.status(404).json({ errors: [ { msg: "You must have a profile in order to follow an artist" } ] })
        }

        let artistProfile = await ArtistProfile.findOne({ _id: req.body.artistId });

        if (!artistProfile) {
            return res.status(404).json({ errors: [ { msg: "Artist profile not found" } ] })
        }

        if (userProfile.followedArtists.includes(req.body.artistId)) {
            return res.status(400).json({ errors: [ { msg: "Already following" } ] })
        }

        userProfile.followedArtists.push(req.body.artistId);
        artistProfile.noFollowers++;

        await userProfile.save();
        await artistProfile.save();

        return res.status(200).json({ profile: userProfile });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
})

module.exports = {
    createArtistProfile,
    getArtistProfile,
    createNormalUserProfile,
    getNormalUserProfile,
    editArtistProfile,
    editNormalUserProfile,
    getArtistProfileView,
    followArtist
}
