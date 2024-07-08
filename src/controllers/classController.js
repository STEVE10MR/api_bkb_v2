import * as classService from '../services/classService.js';
import * as attendanceService from '../services/attendanceService.js';

import catchAsync from '../utils/catchAsync.js';
import appError from '../utils/appError.js';
import sendEmail from '../utils/sendEmail.js';
import resSend from '../utils/resSend.js';
import translatorNext from '../utils/translatorNext.js';
import requireField from '../utils/requireField.js';
import resetUrl from '../utils/resetUrl.js';




export const listarClase = catchAsync(async (req,res,next)=>{

  let filter = {...req.body}

  const data=await classService.listarClassService(filter,req.query)

  resSend(res,{statusCode:201,status:"success",data})
  
})

export const activarClase = catchAsync(async(req,res,next)=>{

  let _id = req.params.id

  if(!_id){
    return next(new appError(translatorNext(req,'MISSING_REQUIRED_FIELDS'),400))
  }

  const data=await classService.activarClassService(_id)

  resSend(res,{statusCode:201,status:"success",data})
})

export const desactivarClase = catchAsync(async(req,res,next)=>{
  let _id = req.params.id
  if(!_id){
    return next(new appError(translatorNext(req,'MISSING_REQUIRED_FIELDS'),400))
  }
  const data=await classService.desactivarClassService(_id)

  resSend(res,{statusCode:201,status:"success",data})
})

export const editarClase = catchAsync(async(req,res,next)=>{
  let _id = req.params.id
  const {name,device_id,course_id,attendance_window,late_window} = req.body

  if(requireField(_id,name,device_id,course_id,attendance_window,late_window)){
    return next(new appError(translatorNext(req,'MISSING_REQUIRED_FIELDS'),400))
  }
  const data=await classService.editarClassService(_id,name,device_id,course_id,attendance_window,late_window)

  resSend(res,{statusCode:201,status:"success",data})
})



export const crearClase = catchAsync(async(req,res,next)=>{
    let _id = req.params.id
    const {name,device_id,course_id,attendance_window,late_window} = req.body
    
    if(requireField(name,device_id,course_id,attendance_window,late_window)){
      return next(new appError(translatorNext(req,'MISSING_REQUIRED_FIELDS'),400))
    }
    const data=await classService.crearClassService(name,device_id,course_id,attendance_window,late_window)
  
    resSend(res,{statusCode:201,status:"success",data})
})


export const crearHorarioClase = catchAsync(async(req,res,next)=>{
    let _id = req.params.id
    const {name,dia} = req.body

    if(requireField(_id,name,dia)){
      return next(new appError(translatorNext(req,'MISSING_REQUIRED_FIELDS'),400))
    }
    const data=await classService.agregarHorarioService(_id,name,dia)
  
    resSend(res,{statusCode:201,status:"success",data})
})

export const quitarHorarioClase = catchAsync(async(req,res,next)=>{
    let _id = req.params.id
    const {horario_id} = req.body

    if(requireField(_id,horario_id)){
      return next(new appError(translatorNext(req,'MISSING_REQUIRED_FIELDS'),400))
    }
    const data=await classService.quitarHorarioService(_id,horario_id)
  
    resSend(res,{statusCode:201,status:"success",data})
})
  

export const crearSubHorarioClase = catchAsync(async(req,res,next)=>{
    let _id = req.params.id
    const {horario_id,startTime,endTime} = req.body
    console.log(_id,horario_id,startTime,endTime)
    if(requireField(_id,horario_id,startTime,endTime)){
      return next(new appError(translatorNext(req,'MISSING_REQUIRED_FIELDS'),400))
    }
    const data=await classService.agregarSubHorarioService(_id,horario_id,startTime,endTime)
  
    resSend(res,{statusCode:201,status:"success",data})
})

export const quitarSubHorarioClase = catchAsync(async(req,res,next)=>{
    let _id = req.params.id
    const {horario_id,subHorario_id} = req.body

    if(requireField(_id,horario_id,subHorario_id)){
      return next(new appError(translatorNext(req,'MISSING_REQUIRED_FIELDS'),400))
    }
    const data=await classService.quitarSubHorarioService(_id,horario_id,subHorario_id)
  
    resSend(res,{statusCode:201,status:"success",data})
})

export const crearEstudianteClase = catchAsync(async(req,res,next)=>{
    let _id = req.params.id
    const {studen_id} = req.body

    if(requireField(_id,studen_id)){
      return next(new appError(translatorNext(req,'MISSING_REQUIRED_FIELDS'),400))
    }
    const checkAttendance =await attendanceService.crearAttendanceService(studen_id,_id)

    if(!checkAttendance){
      return next(new appError(translatorNext(req,'MISSING_REQUIRED_FIELDS'),400))
    }
    const data=await classService.agregarStudentClassService(_id,studen_id)
  
    resSend(res,{statusCode:201,status:"success",data})
})


export const quitarEstudianteClase = catchAsync(async(req,res,next)=>{
    let _id = req.params.id
    const {studen_id} = req.body

    if(requireField(_id,studen_id)){
      return next(new appError(translatorNext(req,'MISSING_REQUIRED_FIELDS'),400))
    }
    const data=await classService.quitarStudentClassService(_id,studen_id)
  
    resSend(res,{statusCode:201,status:"success",data})
})


  