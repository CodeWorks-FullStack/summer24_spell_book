import { baseURL } from '../env.js';
import { logger } from '../utils/Logger.js';

// @ts-ignore
// eslint-disable-next-line no-undef
// NOTE use this instance of axios to send requests to the sandbox API, this one has our bearer tokens attached to it
export const api = axios.create({
  baseURL: baseURL,
  timeout: 8000,
  withCredentials: true
})

// @ts-ignore
// NOTE we will use this axios instance to interact with the DND API specifically
export const dndApi = axios.create({
  baseURL: 'https://www.dnd5eapi.co/api', // where we are sending our requests to, we can append strings to the end when sending the requests
  timeout: 3000 // how long to wait for a response in milliseconds before giving up and throwing an error
})

api.interceptors.request.use(config => config, handleAxiosError)
api.interceptors.response.use(response => response, handleAxiosError)

function handleAxiosError(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    logger.warn('[📡 AXIOS_ERROR_RESPONSE_DATA]', error.response.data)
  } else if (error.request) {
    // The request was made but no response was received
    logger.warn('[📡 AXIOS_ERROR_NO_RESPONSE]', error.request)
  } else {
    // Something happened in setting up the request that triggered an Error
    logger.warn('[📡 AXIOS_ERROR_INVALID_REQUEST]', error.message)
  }
  return Promise.reject(error)
}