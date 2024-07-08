import * as deviceService from '../services/deviceService.js';

import catchAsync from '../utils/catchAsync.js';
import appError from '../utils/appError.js';
import sendEmail from '../utils/sendEmail.js';
import resSend from '../utils/resSend.js';
import translatorNext from '../utils/translatorNext.js';
import requireField from '../utils/requireField.js';
import resetUrl from '../utils/resetUrl.js';




export const listarDispositivo = catchAsync(async (req,res,next)=>{

  let filter = {...req.body}

  const data=await deviceService.listarDeviceService(filter,req.query)

  resSend(res,{statusCode:201,status:"success",data})
  
})

export const activarDispositivo = catchAsync(async(req,res,next)=>{

  let _id = req.params.id

  if(!_id){
    return next(new appError(translatorNext(req,'MISSING_REQUIRED_FIELDS'),400))
  }

  const data=await deviceService.activarDeviceService(_id)

  resSend(res,{statusCode:201,status:"success",data})
})

export const desactivarDispositivo = catchAsync(async(req,res,next)=>{
  let _id = req.params.id
  if(!_id){
    return next(new appError(translatorNext(req,'MISSING_REQUIRED_FIELDS'),400))
  }
  const data=await deviceService.desactivarDeviceService(_id)

  resSend(res,{statusCode:201,status:"success",data})
})

export const editarDispositivo = catchAsync(async(req,res,next)=>{
  let _id = req.params.id
  const {name} = req.body

  if(requireField(_id,name)){
    return next(new appError(translatorNext(req,'MISSING_REQUIRED_FIELDS'),400))
  }
  const data=await deviceService.editarDeviceService(_id,name)

  resSend(res,{statusCode:201,status:"success",data})
})



export const crearDispositivo = catchAsync(async(req,res,next)=>{
    let _id = req.params.id
    const {name} = req.body

    if(requireField(name)){
      return next(new appError(translatorNext(req,'MISSING_REQUIRED_FIELDS'),400))
    }
    const data=await deviceService.crearDeviceService(name)
  
    resSend(res,{statusCode:201,status:"success",id:data.ESP32_token,data})
  })
  
  

