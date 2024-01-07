const asyncHandler = require("express-async-handler");
const UserProfile = require("../models/userProfile");
const User = require("../models/user");
const Album = require("../models/album");
const Playlist = require("../models/playlist");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose")

const createPlaylist = asyncHandler(async (req, res) => {
    const { name, description, songs } = req.body;

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

        let playlist = { name, profileId: profile._id }

        if (description) {
            playlist = { ...playlist, description };
        }

        if (songs) {
            playlist = { ...playlist, songs }
        }

        let newPlaylist = new Playlist(playlist);

        await newPlaylist.save();

        return res.status(200).json({ playlist: newPlaylist })

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
})

const getPlaylist = asyncHandler(async (req, res) => {
    try {
        if (!req.params.playlistId) {
            return res.status(404).json({ errors: [{ msg: "Playlist id not found" }] });
        }
        const playlist = await Playlist.findOne({ _id: req.params.playlistId })
        if (!playlist) {
            return res.status(404).json({ errors: [{ msg: "Playlist not found" }] });
        }
        return res.status(200).json({ playlist });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
})

const getAllPlaylists = asyncHandler(async (req, res) => {
    try {
        let profile = await UserProfile.findOne({ userId: req.user.id });
        if (!profile) {
            return res.status(404).json({ errors: [{ msg: "Profile not found" }] });
        }

        const playlists = await Playlist.find({ profileId: profile.id })

        return res.status(200).json({ playlists });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
})

const deletePlaylist = asyncHandler(async (req, res) => {
    try {
        if (!req.params.playlistId) {
            return res.status(404).json({ errors: [{ msg: "Playlist id not found" }] });
        }
        const playlist = await Playlist.findOne({ _id: req.params.playlistId })
        if (!playlist) {
            return res.status(404).json({ errors: [{ msg: "Playlist not found" }] });
        }
        await Playlist.deleteOne({ _id: playlist.id })
        return res.status(200).json({ playlist });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
})

const addSongToPlaylist = asyncHandler(async (req, res) => {
    try {
        const { playlistId, albumId, songId } = req.body;

        if (!playlistId || !albumId || !songId) {
            return res.status(400).json({ errors: [{ msg: "Bad Request" }] });
        }

        let profile = await UserProfile.findOne({ userId: req.user.id });

        if (!profile) {
            return res.status(404).json({ errors: [{ msg: "Profile not found" }] });
        }

        let album = await Album.findOne({ _id: albumId });

        if (!album) {
            return res.status(404).json({ errors: [{ msg: "Album not found" }] });
        }

        let playlist = await Playlist.findOne({ _id: playlistId });

        if (!playlist) {
            return res.status(404).json({ errors: [{ msg: "Playlist not found" }] });
        }

        let song = playlist.songs.filter((song) => song._id == songId);

        if (song.length) {
            return res.status(403).json({ errors: [{ msg: "Song already in playlist" }] });
        }

        song = album.songs.find((s) => s._id == songId);

        if (!song) {
            return res.status(404).json({ errors: [{ msg: "Song not found" }] });
        }

        playlist.songs.push(song);
        await playlist.save();

        let playlists = await Playlist.find();

        return res.status(200).json({ playlist: playlists });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
})

module.exports = {
    createPlaylist,
    getAllPlaylists,
    getPlaylist,
    deletePlaylist,
    addSongToPlaylist
}
