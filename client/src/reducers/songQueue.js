import {
  SET_CURRENT_SONG,
  ADD_SONG_IN_QUEUE,
  SET_QUEUE,
  GET_CURRENT_SONG
} from "../actions/types";

const emptyState = {
  songs: [],
  currentSong: {},
  currentSongUrl: ""
}

const initialState = JSON.parse(localStorage.getItem("songQueue")) || emptyState;

const songQueue = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_CURRENT_SONG:
      let newStateCurrentSong = { ...state, currentSong: payload.song, currentSongUrl: payload.url };
      localStorage.setItem("songQueue", JSON.stringify(newStateCurrentSong));
      return newStateCurrentSong;
    case ADD_SONG_IN_QUEUE:
      let newStateAddSOng = { ...state, songs: [...state.songs, payload] };
      localStorage.setItem("songQueue", JSON.stringify(newStateAddSOng));
      return newStateAddSOng;
    case SET_QUEUE:
      let newStateQueue = { ...state, songs: payload };
      localStorage.setItem("songQueue", JSON.stringify(newStateQueue));
      return newStateQueue;
    default:
      return state;
  }
}

export default songQueue;
