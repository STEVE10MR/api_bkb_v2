import * as userRepository from '../repositories/userRepository.js';
import appError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import translatorNext from '../utils/translatorNext.js';
import { promisify } from 'util';
import jwt from 'jsonwebtoken';



export default catchAsync(async (req, res, next) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if(req.cookies.jwt){
      token = req.cookies.jwt
    }
  
    if (!token) {
      return next(
        new appError(translatorNext(req,'ERROR_NOT_TOKEN'), 401)
      );
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await userRepository.obtenerUser({_id:decoded.id},undefined,'');
    if (!currentUser) {
      return next(
        new appError(translatorNext(req,'ERROR_USER_NOT_EXIST'),401
        )
      );
    }
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(new appError(translatorNext(req,'ERROR_PASSWORD_CHANGE'), 401));
    }
    if (!currentUser.active) {
      return next(
        new appError(translatorNext(req,'ERROR_USER_NOT_EXIST'),401
        )
      );
    }

    req.user = currentUser;
    next();
})