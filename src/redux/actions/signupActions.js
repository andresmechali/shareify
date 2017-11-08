import axios from 'axios';

const BASE_URL = 'http://localhost:9000';

export function userSignupRequest(userData) {
    return dispatch => {
        return axios.post(BASE_URL + '/api/users', userData);
    }
}