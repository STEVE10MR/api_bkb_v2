import * as attendanceRepository from "../repositories/attendanceRepository.js"

export const crearAttendanceService = async(student_id,class_id)=>{
    const data = await attendanceRepository.crearAttendance({student_id,class_id})
    return data
}   

export const editarAttendanceService = async(student_id,status,tiempoRestante)=>{

    const attendance = await attendanceRepository.obtenerOneAttendance({student_id})
    if(attendance.status != 'falta') return []
    const data = await attendanceRepository.editarAttendance({student_id},{status,tiempoRestante})
    return data
}   

export const listarAttendanceService = async (body,query,popOptions)=>{
    let filter= undefined
    if(body) filter = {...body}
    
    const data=await attendanceRepository.listaAttendance(filter,query,"student_id")
  
    return data 
}
  