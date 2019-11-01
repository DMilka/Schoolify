import axios from 'axios';

const post = () => {};

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
