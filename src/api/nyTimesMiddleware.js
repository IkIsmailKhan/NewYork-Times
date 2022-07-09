import axios from 'axios'
import { userLogin } from '../store/auth/index'

const nyTimesApi = axios.create({
    baseURL: "https://api.nytimes.com/svc/",
    headers: {
        "Content-Type": "application/json",
    },
});

nyTimesApi.interceptors.request.use(
    (config) => {
        const token = window.localStorage.getItem("access_token");
        if (token) {
            config.headers["authorization"] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

nyTimesApi.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        if (err.response) {
            // Access Token was expired
            if (err.response.status === 401) {
                try {
                    const accessToken = await userLogin({
                        email: window.localStorage.getItem('email'),
                        password: window.localStorage.getItem('password'),
                    });
                    window.localStorage.setItem("access_token", accessToken);
                    nyTimesApi.defaults.headers.common["authorization"] = accessToken;
                } catch (_error) {
                    if (_error.response && _error.response.data) {
                        return Promise.reject(_error.response.data);
                    }
                    return Promise.reject(_error);
                }
            }
            if (err.response.status === 403 && err.response.data) {
                return Promise.reject(err.response.data);
            }
        }
        return Promise.reject(err);
    }
);


export default nyTimesApi