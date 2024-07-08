import catchAsync from "../utils/catchAsync.js";
import appError from '../utils/appError.js';
import translatorNext from '../utils/translatorNext.js';


export default function(...roles){
    return catchAsync(async (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new appError(translatorNext(req,'ERROR_DENIED_ACCESS')))
        }
        next()
    })
}
