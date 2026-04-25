import express from "express"
import * as moviesControllers from "../controllers/movies-controlers.js"
import { body } from "express-validator"

const moviesRoutes = express.Router()


moviesRoutes.get("/", moviesControllers.getMovies)

moviesRoutes.post("/search", moviesControllers.searchMovieName)

moviesRoutes.get("/movies/:id", moviesControllers.getMovieById)

moviesRoutes.post("/reviews",[body("review").isLength({max:500}), body("starRating").notEmpty().withMessage("please give a rating")], moviesControllers.postReview)

moviesRoutes.get("/mymovies", moviesControllers.getMoviesByUser)

moviesRoutes.delete("/movies/:id", moviesControllers.deleteMovie)

moviesRoutes.get("/review/:id", moviesControllers.getReviewById)

moviesRoutes.patch("/review/:id",[body("review").isLength({max:500}).withMessage("review is too long"), body("starRating").notEmpty().withMessage("please give a rating")], moviesControllers.editMovie)


export default moviesRoutes