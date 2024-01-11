import { api, apifd } from '../utils/api';
import { setAlert } from './alert';
import {
    ALBUM_ERROR,
  CREATE_ALBUM,
  SET_ALERT,
  GET_ALBUMS,
  DELETE_ALBUM
} from './types';
import io from "socket.io-client";
const socket = io("http://localhost:5000");

export const createAlbum = (formData, navigate, setOpenModal, profile) => async (dispatch) => {
  try {
    const res = await api.post('/album', formData);

    if (res.data?.album) {
      dispatch({
        type: CREATE_ALBUM,
        payload: res.data.album
      });
      dispatch({
        type: SET_ALERT,
        payload: { type: "success", msg: "Album successfully created" }
      })

      if (profile?.followers?.length) {
        console.log(profile)
        socket.emit("new-album-notification", {name: profile.username, followers: profile.followers});
      }

      setOpenModal(false);
      navigate("/profile")
    }
  } catch (err) {
    const errors = err.response?.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert({ msg: error.msg, type: 'error' })));
    }

    dispatch({
      type: ALBUM_ERROR
    });
  }
};

export const getAllAlbums = () => async (dispatch) => {
  try {
    const res = await api.get('/album/all');

    dispatch({
      type: GET_ALBUMS,
      payload: res.data.albums
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert({ msg: error.msg, type: 'error' })));
    }

    dispatch({
      type: ALBUM_ERROR
    });
  }
};

export const uploadSong = (formData, navigate, setOpenModal) => async (dispatch) => {
  try {
    const res = await api.post('/album/uploadSong', formData, {
      headers: {
          "Content-Type": "multipart/form-data"
      }
  });

    if (res.data?.song) {
      dispatch({
        type: SET_ALERT,
        payload: { type: "success", msg: "Song successfully uploaded" }
      })
    }
    setOpenModal(false);
    navigate("/profile");
  } catch (err) {
    const errors = err.response?.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert({ msg: error.msg, type: 'error' })));
    }

    dispatch({
      type: ALBUM_ERROR
    });
  }
};

export const deleteAlbum = (albumId, callback) => async (dispatch) => {
  try {
    const res = await api.delete(`/album/del/${albumId}`);

    if (res.data?.album) {
      dispatch({
        type: DELETE_ALBUM,
        payload: res.data.album
      });
      dispatch({
        type: SET_ALERT,
        payload: { type: "success", msg: "Album successfully deleted" }
      })

      callback();
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert({ msg: error.msg, type: 'error' })));
    }

    dispatch({
      type: ALBUM_ERROR
    });
  }
};