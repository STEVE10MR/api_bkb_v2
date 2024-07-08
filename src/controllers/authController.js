import * as authService from '../services/authService.js';
import catchAsync from '../utils/catchAsync.js';
import jwt from 'jsonwebtoken';
import appError from '../utils/appError.js';
import sendEmail from '../utils/sendEmail.js';
import translatorNext from '../utils/translatorNext.js';
import resetUrl from '../utils/resetUrl.js';
import requireField from '../utils/requireField.js';
import resSend from '../utils/resSend.js';

const signToken = id => {
  console.log(process.env.JWT_SECRET)
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
};

const createSendToken = (user, statusCode, res) => {

    const token = signToken(user._id);

    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: true, 
      sameSite: 'None'
    };
    
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  
    res.cookie('jwt', token, cookieOptions);

    user.password = undefined;
    

    if (process.env.NODE_ENV === 'production') token = undefined;

    res.status(statusCode).json({
      status: 'success',
      token,
      data: {
        user
      }
    });

};

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (requireField(email,password)) {
    return next(new appError(translatorNext(req,'ERROR_LOGIN_PROVIDE_EMAIL_PASSWORD'), 400));
  }

  const user = await authService.loginService(email,password)

  if(typeof user === "string"){
    return next(new appError(translatorNext(req,user), 400));
  }
  createSendToken(user, 200, res);
});


export const verifySession = catchAsync(async (req, res, next) => {

  req.user.d = undefined;
  req.user.passwordChangedAt= undefined;
  req.user.passwordResetExpires= undefined;
  req.user.passwordResetToken= undefined;
  req.user.updatedAt= undefined;
  req.user.createdAt= undefined;
  req.user.__v= undefined;
  req.user._id= undefined;

  resSend(res,{statusCode:201,status:"success",data:req.user})
});

export const forgotPassword = catchAsync(async (req, res, next) => {


  const { email } = req.body;

  if (requireField(email)) {
    return next(new appError(translatorNext(req,'ERROR_LOGIN_PROVIDE_EMAIL_PASSWORD'), 400));
  }
  
  const authObject = await authService.forgotPasswordService(email)

  if(requireField(authObject.user,authObject.token)){
    return next(new appError(translatorNext(req,authObject.messageError,{timeRemaining:authObject.time}), 400));
  }
  const user = authObject.user

  const message = `Ignore`;
  
  try {
    await sendEmail({
      email: user.email,
      subject: translatorNext(req,'RESET_TOKEN_EMAIL_SUBJECT'),
      message,
      url:resetUrl(req,`resetpassword/${authObject.token}`),
      req,
      typeTemplate:1
    });

    let tokenVerify = authObject.token

    if(process.env.NODE_ENV !== 'development') tokenVerify = undefined

    return res.status(200).json({
      status: 'success',
      message: translatorNext(req,'TOKEN_SENT_SUCCESS'),
      tokenVerify
    });

  } catch (err) {
    await authService.sendResetPasswordErrorService(user)

    return next(
      new appError(translatorNext(req,'EMAIL_SEND_ERROR')),
      500
    );
  }
});


export const resetPassword = catchAsync(async (req, res, next) => {

  const {password,passwordConfirm} = req.body
  if(requireField(req.params.token,password,passwordConfirm)) {
    return next(new appError(translatorNext(req,'MISSING_REQUIRED_FIELDS'), 400));
  }
  console.log(password,passwordConfirm)
  const user = await authService.resetPasswordService(req.params.token,password,passwordConfirm)

  if(typeof user === "string"){
    return next(new appError(translatorNext(req,user), 400));
  }

  createSendToken(user, 200, res);
});


export const validateEmailAddress = catchAsync(async (req, res, next) => {

  if(requireField(req.params.token)) {
    return next(new appError(translatorNext(req,'MISSING_REQUIRED_FIELDS'), 400));
  }
  const user = await authService.validateEmailAddressService(req.params.token)

  if(typeof user === "string"){
    return next(new appError(translatorNext(req,user), 400));
  }
  createSendToken(user, 200, res);
});

export const logout = catchAsync(async (req, res, next) => {

  const cookieOptions = {
    expires: new Date(
      Date.now(0)
    ),
    httpOnly: true,
    secure: true, 
    sameSite: 'None'
  };
  
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  
  res.cookie('jwt', '', cookieOptions);

  res.status(200).json({ status: 'success' });
});

