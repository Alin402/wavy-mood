import {
    CREATE_PLAYLIST,
    DELETE_PLAYLIST,
    GET_PLAYLIST,
    GET_PLAYLISTS,
    PLAYLIST_ERROR,
    ADD_SONG_TO_PLAYLIST
} from '../actions/types';

const initialState = {
    playlists: [],
    loading: true
};

const playlist = (state = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_PLAYLIST:
        return { ...state, loading: false, playlists: [...state.playlists, payload] };
      case GET_PLAYLISTS:
        return { ...state, loading: false, playlists: payload };
      case DELETE_PLAYLIST:
        return { ...state, loading: false, playlists: state.playlists.filter((p) => p._id !== payload._id) }
      case ADD_SONG_TO_PLAYLIST:
        return { ...state, loading: false, playlists: payload }
      default:
        return state;
    }
  }

export default playlist;