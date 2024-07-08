import * as attendanceService from '../services/attendanceService.js';
import * as studentService from '../services/studentService.js';
import * as classService from '../services/classService.js';
import catchAsync from '../utils/catchAsync.js';
import appError from '../utils/appError.js';
import sendEmail from '../utils/sendEmail.js';
import resSend from '../utils/resSend.js';
import translatorNext from '../utils/translatorNext.js';
import requireField from '../utils/requireField.js';
import resetUrl from '../utils/resetUrl.js';
import * as apiService from '../services/apiService.js';
import fs from 'fs';

import { DateTime } from 'luxon';
import { Console } from 'console';

const deleteImageTemp =async function(req){
  fs.unlink(req.file.path, (err) => {
    if (err) {
      console.error(err);
    }
  });
}




export const listarAsistencia = catchAsync(async (req,res,next)=>{
  let {id} = req.params
  let filter = {class_id:id,...req.body}

  const data=await attendanceService.listarAttendanceService(filter,req.query)

  resSend(res,{statusCode:201,status:"success",data})
  
})


export const editarAsistencia = catchAsync(async(req,res,next)=>{
  let {idAsistencia} = req.params
  const {student_id,status} = req.body

  if(requireField(idAsistencia,student_id,status)){
    return next(new appError(translatorNext(req,'MISSING_REQUIRED_FIELDS'),400))
  }
  const data=await attendanceService.editarAttendanceService(idAsistencia,student_id,status)

  resSend(res,{statusCode:201,status:"success",data})
})

export const crearAsistencia = catchAsync(async (req, res, next) => {
  let imageFilePath = req.file.path;


  if (!imageFilePath) return resSend(res, { statusCode: 201, status: "error" });

  const imageFile = fs.createReadStream(imageFilePath);
  const faceCheck = await apiService.classifyFace(imageFile);
  if(!faceCheck.data.success) return resSend(res, { statusCode: 201, status: "error" });
  console.log(faceCheck.data)
  const student = await studentService.obtenerStudentService(faceCheck.data.name);
  const checkStudent = await classService.obtenerStudentClassService(student._id);

  const tiempoRestanteInicio = checkStudent.attendance_schedule.attendance_window;
  const tiempoRestanteTardanza = checkStudent.attendance_schedule.late_window;

  const timeZone = 'America/Lima'; 

  const promiseStuden = checkStudent.general_schedule.flatMap(horarios => {
      return horarios.time.map(timeSlot => {
          const { start_time, end_time } = timeSlot;
          const now = DateTime.local().setZone(timeZone);

          const startTime = DateTime.fromFormat(start_time, 'HH:mm', { zone: timeZone });
          const endTime = DateTime.fromFormat(end_time, 'HH:mm', { zone: timeZone });

          const attendanceLimit = startTime.plus({ minutes: tiempoRestanteInicio });
          const tardyLimit = startTime.plus({ minutes: tiempoRestanteTardanza });

          console.log("start_time:", startTime.toISO());
          console.log("end_time:", endTime.toISO());
          console.log("now:", now.toISO());
      
          if (now.toMillis() <= attendanceLimit.toMillis()) {
              console.log(student._id)
              return attendanceService.editarAttendanceService(student._id, 'Asiste', now.toJSDate());
          } else if (now.toMillis() <= tardyLimit.toMillis()) {
              return attendanceService.editarAttendanceService(student._id, 'Tardanza', now.toJSDate());
          } else {
              return Promise.resolve();
          }
      });
  });
  await Promise.all(promiseStuden);
  await deleteImageTemp(req)
  resSend(res, { statusCode: 201, status: "success" });
});