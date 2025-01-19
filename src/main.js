'use strict';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { showToastError, showToastInfo } from './js/utils.js';
import { SIMPLE_LIGHTBOX_SETTINGS, PER_PAGE } from './js/settings.js';
import { fetchPhotosByQuery } from './js/pixabay-api.js';
import { createGalleryCards } from './js/render-functions.js';

const loadMoreBtnEl = document.querySelector('.load-more-button');
const searchFormEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const loaderEl = document.querySelector('.loader');

const gallery = new SimpleLightbox('.gallery a', SIMPLE_LIGHTBOX_SETTINGS);

let page = 1;
let searchQuery = '';

const addPhotosToGallery = photos => {
  const cards = createGalleryCards(photos);
  galleryEl.insertAdjacentHTML('beforeend', cards);
  gallery.refresh();
};

const scrollGallery = page => {
  const galleryItemEl = galleryEl.querySelector(
    `.gallery-item:nth-child(${(page - 1) * PER_PAGE + 1})`
  );
  const itemY = galleryItemEl.getBoundingClientRect().y;
  window.scrollBy({
    top: itemY - 24,
    behavior: 'smooth',
  });
};

const showLoadMoreBtn = () => {
  loadMoreBtnEl.classList.add('active');
  loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);
};

const hideLoadMoreBtn = () => {
  loadMoreBtnEl.classList.remove('active');
  loadMoreBtnEl.removeEventListener('click', onLoadMoreBtnClick);
};

const onSearchFormSubmit = async event => {
  try {
    event.preventDefault();
    searchQuery = event.currentTarget.elements.search_query.value.trim();

    page = 1;
    galleryEl.innerHTML = '';

    hideLoadMoreBtn();

    if (!searchQuery) {
      showToastError('Please, enter a search phrase!');
      return;
    }

    searchFormEl.reset();

    loaderEl.classList.add('active');
    const response = await fetchPhotosByQuery(searchQuery, page);

    if (response.data.totalHits === 0) {
      showToastError(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      loaderEl.classList.remove('active');
      return;
    }

    loaderEl.classList.remove('active');

    addPhotosToGallery(response.data.hits);

    if (response.data.totalHits > PER_PAGE) {
      showLoadMoreBtn();
    }
  } catch (err) {
    console.log(err);
  }
};

const onLoadMoreBtnClick = async event => {
  try {
    page++;
    hideLoadMoreBtn();
    loaderEl.classList.add('active');
    const response = await fetchPhotosByQuery(searchQuery, page);
    loaderEl.classList.remove('active');
    addPhotosToGallery(response.data.hits);
    scrollGallery(page);
    if (page * PER_PAGE >= response.data.totalHits) {
      showToastInfo(
        "We're sorry, but you've reached the end of search results."
      );
    } else {
      showLoadMoreBtn();
    }
  } catch (error) {}
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
