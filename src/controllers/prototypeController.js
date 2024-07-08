import * as userService from '../services/userService.js';
import * as authService from '../services/authService.js';
import * as apiService from '../services/apiService.js';
import catchAsync from '../utils/catchAsync.js';
import appError from '../utils/appError.js';
import sendEmail from '../utils/sendEmail.js';
import resSend from '../utils/resSend.js';
import translatorNext from '../utils/translatorNext.js';
import requireField from '../utils/requireField.js';
import resetUrl from '../utils/resetUrl.js';
import multer from 'multer';
import fs from 'fs';

const deleteImageTemp =async function(req){
  fs.unlink(req.file.path, (err) => {
    if (err) {
      console.error(err);
    }
  });
}


export const detect = catchAsync(async(req,res,next)=>{
  let imageFilePath = req.file.path

  if(!imageFilePath) res.status(400).json({"status":false})

  const imageFile = fs.createReadStream(imageFilePath);
  
  const response = await apiService.classifyFace(imageFile)
  await deleteImageTemp(req)

  res.status(200).json({"status":true,data:response.data})
})

export const consultFace = catchAsync(async(req,res,next)=>{
  let imageFilePath = req.file.path

  if(!imageFilePath) res.status(400).json({"status":false})

  const imageFile = fs.createReadStream(imageFilePath);
  
  const response = await apiService.consultFace(imageFile)
  await deleteImageTemp(req)

  res.status(200).json({"status":true,data:response.data})
})

  
export const addFace = catchAsync(async(req,res,next)=>{
  let imageFilePath = req.file.path
  const {name} = req.body
  if(!imageFilePath) res.status(400).json({"status":false})

  const imageFile = fs.createReadStream(imageFilePath);
  
  const response = await apiService.addFace(name,imageFile)
  await deleteImageTemp(req)

  res.status(200).json({"status":true,data:response.data})
  next()
})
