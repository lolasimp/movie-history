const tmdb = require('./tmdb');
const firebaseApi = require('./firebaseApi');
const {checkLoginStatus,} = require('./auth');

// ajax request to
const apiKeys = () => {
  return new Promise((resolve, reject) => {
    $.ajax('./db/apiKeys.json')
      .done((data) => {
        resolve(data.apiKeys);
      })
      .fail((err) => {
        reject(err);
      });
  });
};

const retrieveKeys = () => {
  apiKeys()
    .then((results) => {
      tmdb.setKey(results.tmdb.apiKeys);
      firebaseApi.setConfig(results.firebase);
      firebase.initializeApp(results.firebase);
      checkLoginStatus();
    })
    .catch((err) => {
      console.error('no keys', err);
    });
};

module.exports = {
  retrieveKeys,
};
