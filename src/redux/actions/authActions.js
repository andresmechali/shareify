
import { SET_CURRENT_USER } from './types';
import { REMOVE_CURRENT_USER } from './types';

import jwt from 'jsonwebtoken';

export function setCurrentUser(userToken) {
    const decodedUser = jwt.decode(userToken);
    if (window.localStorage.token) {
        window.localStorage.setItem('token', userToken)
    }
    if (window.sessionStorage.token) {
        window.sessionStorage.setItem('token', userToken)
    }
    return {
        type: SET_CURRENT_USER,
        user: decodedUser
    }
}

export function removeCurrentUser() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    return {
        type: REMOVE_CURRENT_USER
    }
}