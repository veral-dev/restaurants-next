import clientAxios from './axios';

export default function tokenAuth(token){
    if (token) {
        clientAxios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete clientAxios.defaults.headers.common['x-auth-token'];
    }
};

