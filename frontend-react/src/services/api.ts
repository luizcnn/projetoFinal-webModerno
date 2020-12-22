import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6Ikx1aXogQm9uZmltIFZpZWlyYSBDb3N0YSBOZXRvIiwiZW1haWwiOiJsdWl6Y24yM0BnbWFpbC5jb20iLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNjA4NjQyMzc1LCJleHAiOjE2MDg5MDE1NzV9.FSSr42sup_HvofVydCgG81RH3rzHU-4IG1msUDEqWXc'
    }
});

export default api;