import axios from 'axios';

const api = axios.create(
    {
    //baseURL:"http://localhost:3002/"
    baseURL: "https://back-end-mauve.vercel.app/"
    }
    );

export default api;
