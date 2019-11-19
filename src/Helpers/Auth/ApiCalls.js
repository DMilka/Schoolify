import axios from "axios";

export const post = (url, headersObj, data, callback, callbackError) => {
  axios
    .post(url, data, {
      headers: headersObj
    })
    .then(response => {
      callback(response);
    })
    .catch(error => {
      callbackError(error);
    });
};

export const get = (url, paramsObj, headersObj, callback, callbackError) => {
  axios
    .get(url, {
      params: paramsObj,
      headers: headersObj
    })
    .then(function(response) {
      callback(response.data);
    })
    .catch(function(error) {
      callbackError(error);
    });
};

export const put = (url, data, headersObj, callback, callbackError) => {
  axios
    .put(url, data, headersObj)
    .then(response => callback(response))
    .catch(e => callbackError(e));
};

export const deleteCall = (url, id, headersObj, callback, callbackError) => {
  axios
    .delete(`${url}${id}`, headersObj)
    .then(res => callback(res))
    .catch(e => callbackError(e));
};
