import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import HttpError from "../utils/errorHelper.js";
import User from "../MongoDB/userSchema.js";
import jwt from "jsonwebtoken";

const secret = process.env.TOKEN_SECRET

function sessionDestroy(req, res,next) {
  req.session.destroy((error) => {
    if (error) {
      return next(new HttpError("error destroying the session", 500));
    }
    res.clearCookie("connect.sid");

    return res.status(200).json("logout realizado com sucesso");
  });
}

function verifySession(req, res, next) {
  if (req.session.user) {
    return res
      .status(200)
      .json({ message: "session active", user: req.session.user });
  } else {
    return next(new HttpError("could not verify session", 401));
  }
}

async function userSignup(req, res, next) {
  console.log("body is", req.body)
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((err) => {
      return err.msg;
    });
    const messageString = errors.join(", ");

    return next(new HttpError(messageString, 422));
  }

  const { email, username, password } = req.body;

  try {
    const existingUser = await User.findOne({$or: [{email}, {username}] });
    if(existingUser){
      const field = existingUser.email === email ? "Email" : "Username";
      throw new HttpError(`${field} already exists!`, 422)
    }
  } catch (error) {
   return next(error);
  }


  const saltRounds = 10;
  const hash = bcrypt.hashSync(password, saltRounds);

  const createdUser = new User({
    email: email,
    username: username,
    password: hash,
  });

  try {
    await createdUser.save();

    const sessionUser = {
      email: createdUser.email,
      username: createdUser.username,
      id: createdUser._id,
    };

    const token = jwt.sign({data: sessionUser}, secret, {expiresIn: "24h"})

   res.status(201).json({ message: "user created", newUser: token })

  } catch (error) {
    console.log(error);
    return next(new HttpError("internal server error", 500));
  }
}

async function userLogin(req, res, next) {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    console.log(validationErrors.array());
    const errors = validationErrors.array().map((err) => {
      return err.msg;
    });
    const errorMessages = errors.join(", ");
    return next(new HttpError(errorMessages, 422));
  }

  const { username, password, email } = req.body;

  try {
    const userExists = await User.findOne({ email: email });
    if (!userExists) {
      throw new HttpError("email incorrect");
    }
    const passwordIsCorrect = bcrypt.compareSync(password, userExists.password);

    if (!passwordIsCorrect) {
      return next(new HttpError("password is wrong", 403));
    }

    const user = {
      email: userExists.email,
      username: userExists.username,
      id: userExists._id,
    };


    const token = jwt.sign({data: user}, secret, {expiresIn: "24h"})

    return res
      .status(200)
      .json({ message: "logged in successfully", user: token });
  } catch (error) {
    console.log(error)
   return next(error);
  }
}

export { userSignup, userLogin, verifySession, sessionDestroy };
