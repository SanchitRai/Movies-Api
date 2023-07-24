const express = require("express");
const router = express.Router();
const movie_methods = require("../methods/movie_methods")

//POST / Add all movies to database
router.post('/addallmovies', movie_methods.add_all_movies);

//POST / Save Movie Ratings
router.post('/ratemovie', movie_methods.rate_movie);

//POST / Retrieve Movie List
router.post('/getmovielist', movie_methods.retrieve_movie_list)

//GET / Retrieve Movie List
router.get('/getmovierating', movie_methods.retrieve_movie_rating)

module.exports = router;