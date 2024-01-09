import { api } from '../utils/api';
import { setAlert } from './alert';
import {
  ADD_SONG_TO_PLAYLIST,
    CREATE_PLAYLIST,
    DELETE_PLAYLIST,
    GET_PLAYLIST,
    GET_PLAYLISTS,
    PLAYLIST_ERROR,
    SET_ALERT
} from './types';

export const createPlaylist = (formData, callback) => async (dispatch) => {
  try {
    const res = await api.post('/playlist', formData);

    if (res.data?.playlist) {
      dispatch({
        type: CREATE_PLAYLIST,
        payload: res.data.playlist
      });
      dispatch({
        type: SET_ALERT,
        payload: { type: "success", msg: "Playlist successfully created" }
      })
      callback(res.data.playlist);
    }
  } catch (err) {
    const errors = err.response?.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert({ msg: error.msg, type: 'error' })));
    }

    dispatch({
      type: PLAYLIST_ERROR
    });
  }
};

export const getAllPlaylists = () => async (dispatch) => {
  try {
    const res = await api.get('/playlist/all');

    dispatch({
      type: GET_PLAYLISTS,
      payload: res.data.playlists
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert({ msg: error.msg, type: 'error' })));
    }

    dispatch({
      type: PLAYLIST_ERROR
    });
  }
};

export const deletePlaylist = (playlistId, callback) => async (dispatch) => {
  try {
    const res = await api.delete(`/playlist/del/${playlistId}`);

    if (res.data?.playlist) {
      dispatch({
        type: DELETE_PLAYLIST,
        payload: res.data.playlist
      });
      dispatch({
        type: SET_ALERT,
        payload: { type: "success", msg: "Playlist successfully deleted" }
      })

      callback();
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert({ msg: error.msg, type: 'error' })));
    }

    dispatch({
      type: PLAYLIST_ERROR
    });
  }
};

export const addSongToPlaylist = (formData, callback) => async (dispatch) => {
  try {
    const res = await api.put(`/playlist/song/add`, formData);

    if (res.data?.playlist) {
      dispatch({
        type: ADD_SONG_TO_PLAYLIST,
        payload: res.data.playlist
      });
      dispatch({
        type: SET_ALERT,
        payload: { type: "success", msg: "Song successfully added" }
      })

      callback(res.data.playlist);
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert({ msg: error.msg, type: 'error' })));
    }

    dispatch({
      type: PLAYLIST_ERROR
    });
  }
};