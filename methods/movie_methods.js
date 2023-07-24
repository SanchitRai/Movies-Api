const Movie = require("../schemas/movie");
const jwt = require("jwt-simple");
const config = require("../config/db_config");
const movie_data = require("../movie_ids_05_15_2023");

var functions = {
    add_all_movies: async function (req, res) {
        try {
            await Movie.insertMany(movie_data);
            res.send({
                success: true,
                msz: "Successfully saved all movies in mongoDB",
                error: null
            })
        } catch (error) {
            res.send({
                success: false,
                msz: "An error occurred",
                error: error
            })
        }
    },
    rate_movie: async function (req, res) {
        try {
            var obj = req.body;
            const decodedToken = jwt.decode(obj.token, config.secret);
            if (decodedToken !== undefined) {
                if (decodedToken.email === undefined || decodedToken.email === null || decodedToken.email === "") {
                    res.send({
                        success: false,
                        msz: "User Cridentials are invalid",
                        error: null
                    });
                } else {
                    await Movie.findOneAndUpdate({
                        id: obj.id
                    },
                        {
                            $push: {
                                "rating": { email: decodedToken.email, rating: obj.rating },
                            }
                        })
                    res.send({
                        success: true,
                        msz: "Successfully rated the movie",
                        error: null
                    });
                }
            } else {
                res.send({
                    success: false,
                    msz: "User Cridentials are invalid",
                    error: null
                });
            }
        } catch (error) {
            res.send({
                success: false,
                msz: "An error occurred",
                error: error
            })
        }
    },
    retrieve_movie_list: async function (req, res) {
        try {
            var obj = req.body;
            const decodedToken = jwt.decode(obj.token, config.secret);
            if (decodedToken !== undefined) {
                if (decodedToken.email === undefined || decodedToken.email === null || decodedToken.email === "") {
                    res.send({
                        success: false,
                        msz: "User Cridentials are invalid",
                        error: null
                    });
                } else {
                    const movie_list = await Movie.find({}).skip((obj.page-1) * 100).limit(100);
                    res.send({
                        success: true,
                        msz: "Successfully got the movie list",
                        list: movie_list,
                        error: null
                    });
                }
            } else {
                res.send({
                    success: false,
                    msz: "User Cridentials are invalid",
                    error: null
                });
            }
        } catch (error) {
            res.send({
                success: false,
                msz: "An error occurred",
                error: error
            })
        }
    },
    retrieve_movie_rating: async function (req, res) {
        try {
            var obj = req.query;
            const movie_rating = await Movie.aggregate([
                { $match: {} },
                { $sort: { id: 1 } },
                { $skip: parseInt(obj.page-1)*100 },
                { $limit: 100 },
                {
                    $group: {
                        _id: "$original_title",
                        avgRating: {
                            $avg: {
                                $cond: {
                                    if: { $eq: [{ $size: "$rating" }, 0] },
                                    then: "NA",
                                    else: "$rating.rating"
                                }
                            }
                        }
                    }
                },
                {
                    $project: {
                        title: "$_id",
                        avgRating: { $ifNull: ["$avgRating", "NA"] },
                        _id: 0
                    }
                }
            ]);
            res.send({
                success: true,
                msz: "Successfully got the average ratings",
                rating: movie_rating,
                error: null
            });
        } catch (error) {
            res.send({
                success: false,
                msz: "An error occurred",
                error: error
            })
        }
    }
}

module.exports = functions;