const tmdb = require ('./tmdb');

const myLinks = () => {
  $(document).click((e) => {
    if (e.target.id === 'authenticate') {
      $('#myMovies').addClass('hide');
      $('#search').addClass('hide');
      $('#authScreen').removeClass('hide');
    } else if (e.target.id === 'mine') {
      $('#authScreen').addClass('hide');
      $('#search').addClass('hide');
      $('#myMovies').removeClass('hide');
    } else if (e.target.id === 'navSearch') {
      $('#myMovies').addClass('hide');
      $('#search').removeClass('hide');
      $('#authScreen').addClass('hide');
    }
  });
};

const pressEnter = () => {
  // big ole Keypress event
  tmdb.showResults();
};

const initializer = () => {
  myLinks();
  pressEnter();
};

module.exports = {
  initializer,
};
