'use strict';
import axios from 'axios';
import { API_ENDPOINT, API_KEY, PER_PAGE } from './settings.js';

axios.defaults.baseURL = API_ENDPOINT;

export const fetchPhotosByQuery = (searchedQuery, page) => {
  const requestParams = {
    q: searchedQuery,
    page: page,
    per_page: PER_PAGE,
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  };

  return axios.get(`/`, { params: requestParams });
};
