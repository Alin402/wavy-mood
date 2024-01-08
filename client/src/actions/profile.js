import { api } from '../utils/api';
import { setAlert } from './alert';
import {
  CREATE_PROFILE, 
  PROFILE_ERROR,
  GET_PROFILE,
  SET_ALERT,
  USER_LOADED,
  EDIT_PROFILE,
  FOLLOW_ARTIST
} from './types';

export const createArtistProfile = (formData, navigate, setHasProfile) => async (dispatch) => {
  try {
    const res = await api.post('/profile/artist', formData);

    if (res.data?.profile) {
      dispatch({
        type: CREATE_PROFILE,
        payload: res.data.profile
      });
      dispatch({
        type: SET_ALERT,
        payload: { type: "success", msg: "Profile successfully created" }
      })
      dispatch({
        type: GET_PROFILE,
        payload: res.data.profile
      })
      setHasProfile(true);
    }
  } catch (err) {
    const errors = err.response?.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert({ msg: error.msg, type: 'error' })));
    }

    dispatch({
      type: PROFILE_ERROR
    });
  }
};

export const getArtistProfile = (callback) => async (dispatch) => {
  try {
    const res = await api.get('/profile/artist');

    dispatch({
      type: GET_PROFILE,
      payload: res.data.profile
    });

    callback(res.data.profile)
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert({ msg: error.msg, type: 'error' })));
    }

    dispatch({
      type: PROFILE_ERROR
    });
  }
};

export const createNormalUserProfile = (formData, navigate, setHasProfile) => async (dispatch) => {
  try {
    const res = await api.post('/profile/normalUser', formData);

    if (res.data?.profile) {
      dispatch({
        type: CREATE_PROFILE,
        payload: res.data.profile
      });
      dispatch({
        type: SET_ALERT,
        payload: { type: "success", msg: "Profile successfully created" }
      })
      dispatch({
        type: GET_PROFILE,
        payload: res.data.profile
      })
      setHasProfile(true);
    }
  } catch (err) {
    const errors = err.response?.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert({ msg: error.msg, type: 'error' })));
    }

    dispatch({
      type: PROFILE_ERROR
    });
  }
};

export const getNormalUserProfile = (callback) => async (dispatch) => {
  try {
    const res = await api.get('/profile/normalUser');

    dispatch({
      type: GET_PROFILE,
      payload: res.data.profile
    });

    callback(res.data.profile)
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert({ msg: error.msg, type: 'error' })));
    }

    dispatch({
      type: PROFILE_ERROR
    });
  }
};

export const editArtistProfile = (formData, callback) => async (dispatch) => {
  try {
    const res = await api.put('/profile/artist/edit', formData);

    if (res.data?.profile) {
      dispatch({
        type: EDIT_PROFILE,
        payload: res.data.profile
      });
      dispatch({
        type: SET_ALERT,
        payload: { type: "success", msg: "Profile successfully edited" }
      })
      dispatch({
        type: GET_PROFILE,
        payload: res.data.profile
      })

      callback(res.data.profile)
    }
  } catch (err) {
    const errors = err.response?.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert({ msg: error.msg, type: 'error' })));
    }

    dispatch({
      type: PROFILE_ERROR
    });
  }
};

export const editNormalUserProfile = (formData, callback) => async (dispatch) => {
  try {
    const res = await api.put('/profile/normalUser/edit', formData);

    if (res.data?.profile) {
      dispatch({
        type: EDIT_PROFILE,
        payload: res.data.profile
      });
      dispatch({
        type: SET_ALERT,
        payload: { type: "success", msg: "Profile successfully edited" }
      })
      dispatch({
        type: GET_PROFILE,
        payload: res.data.profile
      })
      callback(res.data.profile)
    }
  } catch (err) {
    const errors = err.response?.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert({ msg: error.msg, type: 'error' })));
    }

    dispatch({
      type: PROFILE_ERROR
    });
  }
};

export const followArist = (artistId, callback) => async (dispatch) => {
  try {
    const res = await api.put('/profile/follow', { artistId });

    if (res.data?.profile) {
      dispatch({
        type: FOLLOW_ARTIST,
        payload: res.data.profile
      });
      dispatch({
        type: SET_ALERT,
        payload: { type: "success", msg: "Artist followed" }
      });

      callback(res.data.profile)
    }
  } catch (err) {
    const errors = err.response?.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert({ msg: error.msg, type: 'error' })));
    }

    dispatch({
      type: PROFILE_ERROR
    });
  }
};