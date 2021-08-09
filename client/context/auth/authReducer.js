import {
    REGISTER_OK,
    REGISTER_ERROR,
    GET_USER,
    LOGIN_OK,
    LOGIN_ERROR,
    CLOSE_SESSION,
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case REGISTER_OK:
        case LOGIN_OK:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                auth: true,
                token: action.payload.token,
                message: null,
                loading: false,
            };
        case GET_USER:
            return {
                ...state,
                auth: true,
                user: action.payload,
                loading: false,
            };

        case CLOSE_SESSION:
        case LOGIN_ERROR:
        case REGISTER_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                auth: null,
                message: action.payload,
                loading: false,
            };

        default:
            return state;
    }
};
