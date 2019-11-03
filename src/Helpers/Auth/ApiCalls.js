import axios from 'axios';

export const post = (url, headersObj, data, callback) => {
  axios
    .post(url, data, {
      headers: headersObj,
    })
    .then((response) => {
      callback(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const get = (url, paramsObj, headersObj, callback) => {
  axios
    .get(url, {
      params: paramsObj,
      headers: headersObj,
    })
    .then(function(response) {
      callback(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
};
