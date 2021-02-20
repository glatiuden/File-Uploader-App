import axios from 'axios';

export default axios.create({
    baseURL: process.env.backend_URL,
    headers: {
        "Content-Type": "application/json"
    }
});
