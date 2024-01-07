import {
    SET_ALERT,
    REMOVE_ALERT
} from "../actions/types";
import { v4 as uuidv4 } from "uuid";

export const setAlert = ({ type, msg }) => dispatch => {
    const ID = uuidv4();
    dispatch({
        type: SET_ALERT,
        payload: {
            ID,
            type,
            msg
        }
    })
    setTimeout(() => dispatch(removeAlert(ID)), 3000);
}

export const removeAlert = (alertID) => dispatch => {
    dispatch({
        type: REMOVE_ALERT,
        payload: alertID
    });
}