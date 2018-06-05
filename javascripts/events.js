const tmdb = require('./tmdb');
const firebaseApi = require('./firebaseApi');
const dom = require('./dom');

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
      // call the getMoviesEvent
      getAllMoviesEvent();
    } else if (e.target.id === 'navSearch') {
      $('#myMovies').addClass('hide');
      $('#search').removeClass('hide');
      $('#authScreen').addClass('hide');
    }
  });
};

const pressEnter = () => {
  // big ole Keypress event
  $(document).keypress((e) => {
    if (e.key === 'Enter' && !$('search').hasClass('hide')) {
      const searchWords = $('#searchBar').val().replace('', '%20');
      tmdb.showResults(searchWords);
    }
  });
};

const saveMovieToWishListEvent = () => {
  $(document).on('click', '.addMovieToWishList', (e) => {
    const movieToAddCard = $(e.target).closest('.movie');
    const movieToAdd = {
      title: movieToAddCard.find('.movie-title').text(),
      overview: movieToAddCard.find('movie-overview').text(),
      'poster_path': movieToAddCard.find('img').data('poster'),
      rating: 0,
      isWatched: false,
    };
    firebaseApi.saveMovieToWishList(movieToAdd)
      .then(() => {
        movieToAddCard.remove();
      })
      .catch((error) => {
        console.error('error in saving move', error);
      });
  });
};

const getAllMoviesEvent = () => {
  firebaseApi.getAllMovies()
    .then((moviesArray) => {
      dom.domString(moviesArray, tmdb.getImageConfig(), 'savedMovies', true);
    })
    .catch((error) => {
      console.error('error in get all Movies', error);
    });
};

const getWatchedMoviesEvent = () => {
  firebaseApi.getWatchedMovies()
    .then((moviesArray) => {
      dom.domString(moviesArray, tmdb.getImageConfig(), 'savedMovies', true);
    })
    .catch((error) => {
      console.error('error in get watched Movies', error);
    });
};

const getWishlistmoviesEvent = () => {
  firebaseApi.getWishlistMovies()
    .then((moviesArray) => {
      dom.domString(moviesArray, tmdb.getImageConfig(), 'savedMovies', true);
    })
    .catch((error) => {
      console.error('error in get all Movies', error);
    });
};

const deleteMoviesFromFirebase = () => {
  $(document).on('click', '.deleteMovie', (e) => {
    // can use in updatedMovieEvent for getting id
    const movieToDeleteId = $(e.target).closest('.movie').data('firebaseId');
    firebaseApi.deleteMovieFromDb(movieToDeleteId)
      .then(() => {
        getAllMoviesEvent();
      })
      .catch((error) => {
        console.error('not deleteing', error);
      });
  });
};

const updateMovieEvent = () => {
  $(document).on('click', '.updateMovieToWatched', (e) => {
    const movieToUpdateId = $(e.target).closest('.movie').data('firebaseId');
    // const updateMovie =
    const movieToUpdateCard = $(e.target).closest('.movie');
    const updatedMovie = {
      title: movieToUpdateCard.find('.movie-title').text(),
      overview: movieToUpdateCard.find('movie-overview').text(),
      'poster_path': movieToUpdateCard.find('img').data('poster'),
      rating: 0,
      isWatched: true,
    };
    firebaseApi.updateMovieToWatchedInDb(updatedMovie, movieToUpdateId)
      .then(() => {
        getAllMoviesEvent();
      })
      .catch((error) => {
        console.error('error in update movie', error);
      });
  });
};

const filterEvents = () => {
  $('#filteredButtons').on('click', (e) => {
    const classList = e.target.classList;
    if (classList.contains('wishlist')) {
      // show only isWatched: false
      getWishlistmoviesEvent();
    } else if (classList.contains('watched')) {
      // show only isWatched: true
      getWatchedMoviesEvent();
    } else {
      getAllMoviesEvent();
    }
  });
};

const authEvents = () => {
  $('#signin-btn').click((e) => {
    e.preventDefault();
    const email = $('#inputEmail').val();
    const pass = $('#inputPassword').val();
    firebase.auth().signInWithEmailAndPassword(email, pass)
      .catch((error) => {
        console.error('error auth', error);
      });
  });
  // registering authentication
  $('#register-btn').click(() => {
    const email = $('#registerEmail').val();
    const pass = $('#registerPassword').val();
    firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function (error) {
      const errorMessage = error.message;
      console.error('not registered', errorMessage);
    });
  });

  $('#register-link').click(() => {
    $('#login-form').addClass('hide');
    $('#registration-form').removeClass('hide');
  });

  $('#signin-link').click(() => {
    $('#login-form').removeClass('hide');
    $('#registration-form').addClass('hide');
  });

  $('#logout').click(() => {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
    })
      .catch(function (error) {
        console.error('logout error', error);
        // An error happened.
      });
  });
};

const initializer = () => {
  myLinks();
  pressEnter();
  saveMovieToWishListEvent();
  deleteMoviesFromFirebase();
  updateMovieEvent();
  filterEvents();
  authEvents();
};

module.exports = {
  initializer,
  getAllMoviesEvent,
};
