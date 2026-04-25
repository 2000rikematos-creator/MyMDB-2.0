import mongoose from "mongoose";
import User from "./userSchema.js";

const reviewSchema = new mongoose.Schema({
    imdbID:{
        type:String,
        required:true
    },
    review:{
        type:String,
        maxlength: 500
    },
    starRating:{
        type: Number,
        required: true,
    },
    movieData:{
        type: Object,
        required:true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

const Review = mongoose.model("Review", reviewSchema)

export default Review