import axios from 'axios'

const nyTimesApi = axios.create({
    baseURL: "https://api.nytimes.com/svc/"
});

export default nyTimesApi;