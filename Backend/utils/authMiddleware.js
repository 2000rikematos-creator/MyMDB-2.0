import HttpError from "./errorHelper";

function checkAuth(req,res,next){
    if(!req.session.user){return next(new HttpError("please log in", 401))}
    next()
}

export default checkAuth