import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.the-odds-api.com/v3/sports/?apiKey=',
  responseType: 'json'
});

export default instance;