import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { setErrorMessage } from '../helpers/Messages';
import { API_ENDPOINT } from '../Config';

const customAxios = axios.create({
  baseURL: API_ENDPOINT,
  timeout: 10000,
});

const requestHandler = (request: InternalAxiosRequestConfig) => {
  return request;
};

const responseHandler = (response: AxiosResponse) => {
  return response;
};

const errorHandler = (error: AxiosError) => {
  let message = '';
  switch (error.response?.status) {
    case 401:
      message = 'You cannot access to the resource';
      break;
    case 403:
        message = 'Resource not available';
        break;
    case 404:
      message = 'Resource not found';
      break;
  
    case 500:
      message = 'System error, please try again later';
      break;
    default:
      message ='There were issues whit the service';
      break;
  }

  return Promise.reject(
    setErrorMessage(message, error.code ?? '000', error)
  );
};

customAxios.interceptors.request.use(
  (request: InternalAxiosRequestConfig) => requestHandler(request),
  (error: AxiosError) => errorHandler(error)
);

customAxios.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export default customAxios;
