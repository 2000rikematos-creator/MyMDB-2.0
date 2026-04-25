import express from "express"
import * as usersControllers from "../controllers/usersControlers.js" 
import { body } from "express-validator"

const usersRoutes = express.Router()

usersRoutes.post("/signup",
    [body("email").notEmpty().isEmail().withMessage("invalid email"),
    body("password").notEmpty().isLength({min:10}).withMessage("password needs to be at least 10 characters long"),
    body("username").notEmpty().isLength({min:5}).withMessage("username needs to be at least 5 characters long")], usersControllers.userSignup)
usersRoutes.post("/login",[body("email").notEmpty().withMessage("please input email"),
     body("password").notEmpty().withMessage("please input password")], usersControllers.userLogin)
usersRoutes.get("/me", usersControllers.verifySession)
usersRoutes.post("/logout", usersControllers.sessionDestroy)

export default usersRoutes