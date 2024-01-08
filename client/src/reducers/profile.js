import {
    CREATE_PROFILE,
    GET_PROFILE,
    PROFILE_ERROR,
    LOGOUT,
    EDIT_PROFILE,
    FOLLOW_ARTIST
} from "../actions/types";

const initialState = {
    profile: {},
    loading: true
};

const profile = (state = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_PROFILE, EDIT_PROFILE, FOLLOW_ARTIST:
        return { profile: payload, loading: false };
      case GET_PROFILE:
        return { profile: payload, loading: false }
      case LOGOUT:
        return { profile: {}, loading: false }
      default:
        return state;
    }
  }

export default profile;