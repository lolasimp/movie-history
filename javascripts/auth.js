const {getAllMoviesEvent,} = require('./events');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      $('#myMovies').removeClass('hide');
      $('#search').addClass('hide');
      $('#authScreen').addClass('hide');
      $('#mine, #navSearch, #logout').removeClass('hide');
      $('#authenticate').addClass('hide');
      // call the getMoviesEvents
      // object destructioning by moving as an object to replace const events= must also initialize it in events.js
      getAllMoviesEvent();
    } else {
      // No user is signed in.
      $('#myMovies').addClass('hide');
      $('#search').addClass('hide');
      $('#authScreen').removeClass('hide');
      $('#logout, #mine, #navSearch').addClass('hide');
      $('#authenticate').removeClass('hide');
    }
  });
};

module.exports = {
  checkLoginStatus,
};
