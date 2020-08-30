import { SET_ALERT, REMOVE_ALERT } from "./types";
import uuid from "uuid/v4";

export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
  const id = uuid();
  console.log("uuid:", id);
  dispatch({
    type: SET_ALERT,
    paylaod: { msg, alertType, id },
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, paylaod: id }), timeout);
};
