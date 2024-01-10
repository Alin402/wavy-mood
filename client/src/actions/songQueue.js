import {
    SET_CURRENT_SONG,
    ADD_SONG_IN_QUEUE,
    GET_CURRENT_SONG,
    SET_QUEUE
} from "./types";
import { api } from "../utils/api";

const getSongUrl = async (songUrl, callback) => {
    try {
        const res = await api.get(`/album/song/${songUrl}`);
        if (res?.data.url) {
            callback(res.data.url);
        }
    } catch (error) {
        console.log(error)
    }
  }

export const setCurrentSong = (index) => async (dispatch) => {
    await getSongUrl(index.fileUrl, (url) => {
        dispatch({
            type: SET_CURRENT_SONG,
            payload: { song: index, url }
        })
    })
}

export const addSOngInQueue = (songName) => (dispatch) => {
    dispatch({
        type: ADD_SONG_IN_QUEUE,
        payload: songName
    })
}

export const setQueue = (queue) => (dispatch) => {
    dispatch({
        type: SET_QUEUE,
        payload: queue
    })
}