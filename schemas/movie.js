const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    adult:{
        type: Boolean,
        require: true, 
    },
    id:{
        type: Number,
        require: true,
    },
    original_title:{
        type: String,
        require: true,
    },
    popularity:{
        type: Number,
        float: true,
        require: true,
    },
    video:{
        type: Boolean,
        require: true,
    },
    rating:[{
        rating: Number,
        email: String
    }]

});

module.exports = mongoose.model("Movies", movieSchema);
