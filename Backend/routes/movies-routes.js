import express from "express"
import * as moviesControllers from "../controllers/movies-controlers.js"
import { body } from "express-validator"
import checkAuth from "../utils/authMiddleware.js"

const moviesRoutes = express.Router()
const app = express()


moviesRoutes.get("/", moviesControllers.getMovies)

moviesRoutes.use(checkAuth)

moviesRoutes.post("/search", moviesControllers.searchMovieName)

moviesRoutes.get("/movies/:id", moviesControllers.getMovieById)

moviesRoutes.post("/reviews",[body("review").isLength({max:500}), body("starRating").notEmpty().withMessage("please give a rating")], moviesControllers.postReview)

moviesRoutes.delete("/movies/:id", moviesControllers.deleteMovie)

moviesRoutes.get("/review/:id", moviesControllers.getReviewById)

moviesRoutes.patch("/review/:id",[body("review").isLength({max:500}).withMessage("review is too long"), body("starRating").notEmpty().withMessage("please give a rating")], moviesControllers.editMovie)

moviesRoutes.get("/mymovies", moviesControllers.getMoviesByUser)

export default moviesRoutes