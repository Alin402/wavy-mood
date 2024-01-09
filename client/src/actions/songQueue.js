import {
    SET_CURRENT_SONG,
    ADD_SONG_IN_QUEUE,
    GET_CURRENT_SONG,
    SET_QUEUE
} from "./types";

export const setCurrentSong = (index) => (dispatch) => {
    dispatch({
        type: SET_CURRENT_SONG,
        payload: index
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