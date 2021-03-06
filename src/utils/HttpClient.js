import { generateUniqueId } from './helpers';
import axios from 'axios';

const supportedErrorCodes = {
  SOME_SUPPORTED_ERROR_CODE: 'SOME_SUPPORTED_ERROR_CODE',
};

const instantiateErrorWithCodeAndMsg = ({ code, message, original }) => {
  const error = new Error(message);

  error.code = code;
  error.original = original;

  return error;
};
const getErrorCodeAndMsg = (error = {}) => {
  const errorMsg = error.message || error;

  return {
    code: supportedErrorCodes[error.code] || 'UNKNOWN_ERROR',
    message: typeof errorMsg === 'object' ? window.JSON.stringify(errorMsg, null, 2) : errorMsg,
    original: error,
  };
};
const extractErrorFromResponse = error => error.response && error.response.data;
const getError = error =>
  instantiateErrorWithCodeAndMsg(getErrorCodeAndMsg(extractErrorFromResponse(error)));

class HttpClient {
  static createInstance(instanceConfig) {
    const axiosInstance = axios.create({
      baseURL:
        process.env.NODE_ENV === 'production'
          ? 'https://arthur-murray-system.herokuapp.com/api/v0'
          : 'http://localhost:8087/api/v0',
      ...instanceConfig,
    });

    axiosInstance.interceptors.request.use(config => {
      const reqHeader = {
        Accept: 'application/json',
        'x-trace-id': generateUniqueId(),
      };

      return {
        ...config,
        headers: {
          ...config.headers,
          ...reqHeader,
        },
      };
    }, null);

    axiosInstance.interceptors.response.use(null, error => Promise.reject(getError(error)));

    return axiosInstance;
  }
}

export { HttpClient as default, supportedErrorCodes };
