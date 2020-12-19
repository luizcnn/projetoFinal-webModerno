import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6Ikx1aXogQm9uZmltIFZpZWlyYSBDb3N0YSBOZXRvIiwiZW1haWwiOiJsdWl6Y24yM0BnbWFpbC5jb20iLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNjA4MzI2MTE1LCJleHAiOjE2MDg1ODUzMTV9.-ErKP8MzEV_uBn4KSK4hgpf3LPpfXguJ9lGrJcuUT2w'
    }
});

export default api;