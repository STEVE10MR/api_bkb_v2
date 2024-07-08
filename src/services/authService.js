import * as userRepository from '../repositories/userRepository.js';
import crypto from 'crypto';
import getTimeMinutes from '../utils/getTimeMinutes.js';


export const loginService = async (email,password) => {

  const user = await userRepository.obtenerUser({ email },null,"+password -passwordChangedAt -passwordResetExpires -passwordResetToken -updatedAt -createdAt -__v");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return 'ERROR_LOGIN_INCORRECT'
  }
  else if(!user.active){
    return 'ERROR_ACCESS_USER'
  }

  return user
};

export const forgotPasswordService = async (email) => {

  const user = await userRepository.obtenerUser({email});
  
  if (!user) {
    return {messageError:'ERROR_USER_NOT_EXIST'}
  }
  else if(!user.active){
    return {messageError:'ERROR_LOGIN_DESACTIVATED'}
  }
  
  else if(user?.passwordResetExpires && Date.now() <= user?.passwordResetExpires.getTime()){
    return {messageError:'TOKEN_TIME',time:getTimeMinutes(user.passwordResetExpires)}
  }

  const token=user.createPasswordResetToken()
  
  await user.save({validateBeforeSave :false})

  return {user,token}
};


export const resetPasswordService = async (token,password,passwordConfirm) => {

  const hashedToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  const user = await userRepository.obtenerUser({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  if (!user) {
    return 'TOKEN_INVALID_OR_EXPIRED'
  }
  else if(!user.active){
    return 'ERROR_LOGIN_DESACTIVATED'
  }
  user.password = password;
  user.passwordConfirm = passwordConfirm;
  user.passwordResetToken=undefined
  user.passwordResetExpires=undefined
  
  console.log(user)

  const userUpdate=await user.save();

  return userUpdate
  
};


export const validateEmailAddressService = async (token) => {

  const hashedToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
  const user = await userRepository.obtenerUser({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });
  if (!user) {
    return 'TOKEN_INVALID_OR_EXPIRED'
  }
  console.log(user)
  await userRepository.editarUser({_id:user._id},{
    active:true,
    passwordResetToken:null,
    passwordResetExpires:null,
  })

  return user
};


export const sendResetPasswordErrorService = async(user)=>{
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save({ validateBeforeSave: false });
}
