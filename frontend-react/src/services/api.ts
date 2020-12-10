import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTQsIm5hbWUiOiJMb3JlbmEgRmFyaWFzIFBpbWVudGVsIENvc3RhIiwiZW1haWwiOiJsb3JlbmFAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTYwNzQ3MzUzMywiZXhwIjoxNjA3NzMyNzMzfQ.rnkbdnaSpzDREYxnc5gR8tp6uQGRsZqGiSL3Dt7mAr4'
    }
});

export default api;