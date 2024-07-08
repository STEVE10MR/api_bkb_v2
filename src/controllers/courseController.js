import * as courseService from '../services/courseService.js';

import catchAsync from '../utils/catchAsync.js';
import appError from '../utils/appError.js';
import sendEmail from '../utils/sendEmail.js';
import resSend from '../utils/resSend.js';
import translatorNext from '../utils/translatorNext.js';
import requireField from '../utils/requireField.js';
import resetUrl from '../utils/resetUrl.js';




export const listarCurso = catchAsync(async (req,res,next)=>{

  let filter = {...req.body}

  const data=await courseService.listarCourseService(filter,req.query)

  resSend(res,{statusCode:201,status:"success",data})
  
})

export const activarCurso = catchAsync(async(req,res,next)=>{

  let _id = req.params.id

  if(!_id){
    return next(new appError(translatorNext(req,'MISSING_REQUIRED_FIELDS'),400))
  }

  const data=await courseService.activarCourseService(_id)

  resSend(res,{statusCode:201,status:"success",data})
})

export const desactivarCurso = catchAsync(async(req,res,next)=>{
  let _id = req.params.id
  if(!_id){
    return next(new appError(translatorNext(req,'MISSING_REQUIRED_FIELDS'),400))
  }
  const data=await courseService.desactivarCourseService(_id)

  resSend(res,{statusCode:201,status:"success",data})
})

export const editarCurso = catchAsync(async(req,res,next)=>{
  let _id = req.params.id
  const {name} = req.body

  if(requireField(_id,name)){
    return next(new appError(translatorNext(req,'MISSING_REQUIRED_FIELDS'),400))
  }
  const data=await courseService.editarCourseService(_id,name)

  resSend(res,{statusCode:201,status:"success",data})
})

export const crearCurso = catchAsync(async(req,res,next)=>{
    let _id = req.params.id
    const {name} = req.body

    if(requireField(name)){
      return next(new appError(translatorNext(req,'MISSING_REQUIRED_FIELDS'),400))
    }
    const data=await courseService.crearCourseService(name)
  
    resSend(res,{statusCode:201,status:"success",data})
  })
  
  

