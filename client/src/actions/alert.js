import { SET_ALERT, REMOVE_ALERT} from "./types";

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const setAlert = (msg, alertType,timeout = 5000) => dispatch => {

    const  buff = [];
    while (buff.length < 10) {
        const charCode = parseInt(Math.random() * (61));
        buff.push(ALPHABET.charAt(charCode));
    }
    const id = buff.join('');
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType ,id }
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }),timeout);

};