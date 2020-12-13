import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTQsIm5hbWUiOiJMb3JlbmEgRmFyaWFzIFBpbWVudGVsIENvc3RhIiwiZW1haWwiOiJsb3JlbmFAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTYwNzg4NTY2NywiZXhwIjoxNjA4MTQ0ODY3fQ.uNVtBtYOxRI98yMzONNkTzw65C5RA4POohlN7II6PD0'
    }
});

export default api;