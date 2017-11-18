
import { SET_CURRENT_USER } from './types';
import { REMOVE_CURRENT_USER } from './types';

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    }
}

export function removeCurentUser() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    return {
        type: REMOVE_CURRENT_USER
    }
}