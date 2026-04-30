import HttpError from "./errorHelper.js";
import jwt from "jsonwebtoken";

function checkAuth(req,res,next){

    const secret = process.env.TOKEN_SECRET

   if(!req.headers.authorization) return next(new HttpError("unauthorized" ,401))
   const authHeader = req.headers.authorization
    const token = authHeader.split(' ')[1];
    try{
        const verifiedToken = jwt.verify(token,secret)
        req.userData = verifiedToken.data
       next()
    }catch(error){
        console.log(error)
        return next(new HttpError("unauthorized",401))
    }
    
    
}

export default checkAuth