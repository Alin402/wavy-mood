import {
    REGISTER_SUCCESS,
    //REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    //LOGIN_FAIL,
    LOGOUT,
  } from '../actions/types';
  import setAuthToken from '../utils/setAuthToken';
  
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
  };
  
  function user(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case USER_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: payload
        };
      case LOGIN_SUCCESS:
        localStorage.setItem("token", payload.token)
        setAuthToken(payload.token)
        return {
          ...state,
          ...payload,
          isAuthenticated: true,
          loading: false
        };
      case AUTH_ERROR:
      case LOGOUT:
        localStorage.removeItem("token")
        localStorage.removeItem("songQueue");
        localStorage.removeItem("recentlyViewed");
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
          user: null
        };
      default:
        return state;
    }
  }
  
  export default user;