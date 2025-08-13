import axios from 'axios';

export default {
    install: (app) => {
        axios.defaults.baseURL = 'http://localhost:9000/api';
        app.config.globalProperties.$axios = axios;
    }
}