import { combineReducers } from "redux";
import user from "./user";
import alert from "./alert";
import profile from "./profile";
import songQueue from "./songQueue";
import album from "./album";
import playlist from "./playlist";

export default combineReducers({
  user,
  alert,
  profile,
  songQueue,
  album,
  playlist
})