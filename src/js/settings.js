import icoError from '../img/error.svg';
import icoInfo from '../img/info.svg';

/* Pagination */
export const PER_PAGE = 15;

/* Pixabay API */
export const API_KEY = '48136593-1bf82471b28fd261a3cd32e51';
export const API_ENDPOINT = 'https://pixabay.com/api';

/* iziToast */
const COLOR_ERROR = ' #ef4040';
const COLOR_INFO = ' #0099FF';
const ICO_ERROR = icoError;
const ICO_INFO = icoInfo;

export const IZI_TOAST_ERROR = {
  timeout: 4000,
  backgroundColor: COLOR_ERROR,
  messageSize: '16',
  messageColor: 'white',
  messageLineHeight: '64',
  iconUrl: ICO_ERROR,
  resetOnHover: true,
  transitionIn: 'flipInX',
  transitionOut: 'flipOutX',
  position: 'topRight',
};

export const IZI_TOAST_INFO = {
  timeout: 4000,
  backgroundColor: COLOR_INFO,
  messageSize: '16',
  messageColor: 'white',
  messageLineHeight: '64',
  iconUrl: ICO_INFO,
  resetOnHover: true,
  transitionIn: 'flipInX',
  transitionOut: 'flipOutX',
  position: 'topRight',
};

/* SimpleLightbox */

export const SIMPLE_LIGHTBOX_SETTINGS = {
  captionsData: 'alt',
  captionDelay: 250,
};

export default {
  IZI_TOAST_ERROR,
  IZI_TOAST_INFO,
  SIMPLE_LIGHTBOX_SETTINGS,
};
