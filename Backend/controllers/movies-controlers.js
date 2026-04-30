import express from "express"
import HttpError from "../utils/errorHelper.js";
import { validationResult } from "express-validator";
import Review from "../MongoDB/reviewSchema.js";
import "dotenv/config";

 
const apiKey = process.env.TMDB_APIKEY;


async function getReviewById(req,res,next){

    try{
    const id = req.params.id
    const found = await Review.findById(id)
    res.status(200).json({review: found})
    }catch(error){
        return next(error)
    }
    
}

async function getMovies(req,res){

    try{
        const reviews = await Review.find().populate("user", "username") 
        console.log("reviews is", reviews)
        res.status(200).json({movies: reviews})
    }catch(error){
        console.log(error)
       return next(new HttpError("could not load reviews", 500))
    }

    
}

async function searchMovieName(req,res,next){
    const movieSearch = req.body.title
    const movieSearchURI = encodeURIComponent(movieSearch).replace(/%20/g, "+")

    try{
        const response = await fetch(`http://www.omdbapi.com/?s=${movieSearchURI}&apikey=${apiKey}`)
        const responseData = await response.json()
        console.log(responseData)
        if(!response.ok){throw new HttpError("movies not available", 404) }
         res.status(200).json(responseData)

    }catch(error){
      return next(error)
    }
    

}

async function getMovieById(req,res){
    const ID = req.params.id
   

    try{                            
        const response = await fetch(`http://www.omdbapi.com/?i=${ID}&apikey=${apiKey}`)
        const responseData = await response.json()
         if(!response.ok){throw new HttpError("movies not available", 404) }
        res.status(200).json(responseData)
    }catch(error){
      return next(error)
    } 
}

async function postReview(req,res,next){
    console.log("verified is", req.userData)
    const validationErrors = validationResult(req)
    const userID = req.userData.id

    if(!validationErrors.isEmpty()){
        const errors = validationErrors.array().map((err)=>{return err.msg})
        const errorMessages = errors.join(", ")
        return next(new HttpError(errorMessages, 422))
    }

    const userReview = req.body

try{
    const reviewIsDuplicated = await Review.find({imdbID: userReview.movieData.imdbID, user: userID})
    if(reviewIsDuplicated.length > 0){ throw new HttpError("You already reviewed this movie", 500)} 
}catch(error){
   return next(error)
}
   

    try{

 const newReview = new Review({
      review:userReview.review,
       starRating: userReview.starRating,
        user: userID,
         movieData: userReview.movieData,
         imdbID: userReview.movieData.imdbID
        })

       await newReview.save() 

    res.status(201).json({message:"Review posted"})

    }catch(error){
        console.log(error)
      return  next(new HttpError("failed to post review"))
    }
    
}

async function getMoviesByUser(req,res,next){
    const userID = req.userData.id
   try{
      const userReviews = await Review.find({user: userID})
        res.status(200).json(userReviews);

    }catch(error){
       return next(error)
 }

}

async function deleteMovie(req,res,next){
   
    try{
    const id = req.params.id
    const reviewToDelete = await Review.findById(id)
    if(!reviewToDelete){throw new HttpError("review not found",404)}
    const userIsCorrect = reviewToDelete.user._id.toString() === req.userData.id
    if(!userIsCorrect){throw new Error("user is not corrrect") }
    const deleteMovie = await Review.findByIdAndDelete(id) 
    res.status(200).json({message:"deleted sucessfully", review: id})
    }catch(error){
       return next(error)
    }
    
}

async function editMovie(req,res,next){

    const validationErrors = validationResult(req)
    if(!validationErrors.isEmpty()){
        const errors = validationErrors.array().map((err)=>{return err.msg})
        const errorMessages = errors.join(", ")
      return next(new HttpError(errorMessages, 422))  
    }

    const id = req.params.id
    const editedReview = req.body
    
    try{
        const pdatedReview = await Review.findByIdAndUpdate(id, {$set:{starRating:editedReview.starRating, review:editedReview.review}})
        res.status(200).json({message: "review updated"})
    }catch(error){
       return next(error)
    }
    
    
}

export {getMovies, searchMovieName, getMovieById, postReview, getMoviesByUser, deleteMovie, getReviewById, editMovie}