import { combineReducers } from "redux";
import user from "./user";
import alert from "./alert";
import profile from "./profile";

export default combineReducers({
  user,
  alert,
  profile,
})