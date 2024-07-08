import * as studentService from '../services/studentService.js';
import * as apiService from '../services/apiService.js';
import catchAsync from '../utils/catchAsync.js';
import appError from '../utils/appError.js';
import sendEmail from '../utils/sendEmail.js';
import resSend from '../utils/resSend.js';
import translatorNext from '../utils/translatorNext.js';
import requireField from '../utils/requireField.js';
import resetUrl from '../utils/resetUrl.js';
import fs from 'fs';

const deleteImageTemp =async function(req){
  fs.unlink(req.file.path, (err) => {
    if (err) {
      console.error(err);
    }
  });
}

export const listarUsuarios = catchAsync(async (req,res,next)=>{

  let filter = {...req.body}

  const data=await studentService.listarStudentService(filter,req.query)

  resSend(res,{statusCode:201,status:"success",data})
  
})

export const activarUsuario = catchAsync(async(req,res,next)=>{

  let _id = req.params.id

  if(!_id){
    return next(new appError(translatorNext(req,'MISSING_REQUIRED_FIELDS'),400))
  }

  const data=await studentService.activarStudentService(_id)

  resSend(res,{statusCode:201,status:"success",data})
})

export const desactivarUsuario = catchAsync(async(req,res,next)=>{
  let _id = req.params.id
  if(!_id){
    return next(new appError(translatorNext(req,'MISSING_REQUIRED_FIELDS'),400))
  }
  const data=await studentService.desactivarStudentService(_id)

  resSend(res,{statusCode:201,status:"success",data})
})

export const editarUsuario = catchAsync(async(req,res,next)=>{
  let _id = req.params.id
  const {firtName , lastName,codigo} = req.body

  if(requireField(_id,firtName,lastName,codigo)){
    return next(new appError(translatorNext(req,'MISSING_REQUIRED_FIELDS'),400))
  }
  const data=await studentService.editarStudentService(_id,`${firtName} ${lastName}`,codigo)

  resSend(res,{statusCode:201,status:"success",data})
})


export const crearUsuario = catchAsync(async(req,res,next)=>{
    
    const {firtName , lastName,codigo} = req.body
    let imageFilePath = req.file.path
    if(!imageFilePath) res.status(400).json({"status":false})
    const imageFile = fs.createReadStream(imageFilePath);
    const faceCheck = await apiService.classifyFace(imageFile)
    if(faceCheck.data.name ==codigo){
      return next(new appError(translatorNext(req,'MISSING_REQUIRED_FIELDS'),400))
    }
    const imageFile2 = fs.createReadStream(imageFilePath);
    const response = await apiService.addFace(codigo,imageFile2)
    if(!response.data?.success || !response.data.success){
      return next(new appError(translatorNext(req,'MISSING_REQUIRED_FIELDS'),400))
    }
    await deleteImageTemp(req)

    if(requireField(firtName,lastName,codigo)){
      return next(new appError(translatorNext(req,'MISSING_REQUIRED_FIELDS'),400))
    }
    const data=await studentService.crearStudentService(`${firtName} ${lastName}`,codigo)
  
    resSend(res,{statusCode:201,status:"success",data})
  })
  
  

