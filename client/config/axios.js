import axios from 'axios';

const clientAxios = axios.create({
    baseURL: 'https://next-rest-app.herokuapp.com/',
});

export default clientAxios;
