import axios from "axios";
import qs from 'qs'
const service = axios.create({
  timeout: 5000,
});

// Request interceptors
service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    // Handle request error here
    Promise.reject(error);
  },
);

// Response interceptors
service.interceptors.response.use(
  response => {
    if (response.status >= 400) {
      return Promise.reject(response.data);
    } else {
      return Promise.resolve(response.data);
    }
  },

  error => {
    let errdata;
    try {
      errdata = error.response.data || {};
    } catch {
      errdata = {}
    }
    return Promise.reject(errdata);
  },
);

function request(method) {
  return async (url, data, opt) => {
    let options = {
      method,
      url,
      data,
      baseURL: process.env.VUE_APP_BASE_URL,
        // baseURL:'http://192.168.30.39:8080',
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      },
    };
    options = opt
      ? {
          ...options,
          ...opt,
        }
      : options;
    if (["GET", "DELETE"].includes(method)) {
      options.params = data;
      options.data = {};
    }
    options.data = qs.stringify({...data, language: window.localStorage.getItem('lang')})
    return await service(options)
      .then(res => {
        return [null, res];
      })
      .catch(err => {
        const { errors } = err;
        const errorsKey = errors && Object.keys(errors)[0];
        if (errors && errorsKey) {
          err.msg = errors[errorsKey][0];
        }
        const defaultMsg = "Network Error";
        if (typeof(err) !== 'object'){
          err = {}
        }
        err.message = err.msg ? err.msg : err.message ? err.message : defaultMsg;

        return [err, err];
      });
  };
}

export const GET = request("GET");
export const POST = request("POST");
export const PUT = request("PUT");
export const DELETE = request("DELETE");

export default service;
