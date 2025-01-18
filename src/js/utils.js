'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import settings from './settings.js';

export const showToastError = message => {
  iziToast.settings(settings.IZI_TOAST_ERROR);
  iziToast.error({ message: message });
};

export const showToastInfo = message => {
  iziToast.settings(settings.IZI_TOAST_INFO);
  iziToast.error({ message: message });
};

const showElement = element => {
  element.classList.add('active');
};

const hideElement = element => {
  element.classList.remove('active');
};

export default { showToastError, showToastInfo, showElement, hideElement };
