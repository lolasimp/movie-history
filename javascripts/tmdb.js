/* eslint camelcase: 0 */

const dom = require('./dom');

let tmdbKey = '';

// setter method to set key
const setKey = (key) => {
  tmdbKey = key;
};

const searchTMDB = (text) => {
  return new Promise((resolve, reject) => {
    $.ajax(`https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&language=en-US&query=${text}&page=1&include_adult=false`)
      .done((result) => {
        resolve(result.results);
      })
      .fail((err) => {
        reject(err);
      });
  });

};

const showResults = (searchText) => {
  searchTMDB(searchText)
    .then((result) => {
      dom.domString(result);
    })
    .catch((err) => {
      console.error('search error', err);
    });
};

module.exports = {
  showResults,
  setKey,
};
