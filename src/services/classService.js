import * as classRepository from "../repositories/classRepository.js"
//import * as studentservice from "../services/studentservice.js"
import * as attendanceService from "../services/attendanceService.js"
import mongoose from "mongoose"


/*
if(typeof data.messageError === 'string'){
    return next(new appError(translatorNext(req,data),400))
}
*/

export const crearClassService = async(name,device_id,course_id,attendance_window,late_window)=>{
    if(attendance_window>late_window){
        return {messageError:'ERROR_MESSAGE'}
    }
    const data = await classRepository.crearClass({name,device_id,course_id,attendance_schedule:{attendance_window,late_window}})

    if(!data){
        return {messageError:'ERROR_MESSAGE'}
    }
    return data
}   

export const editarClassService = async(_id,name,device_id,course_id,attendance_window,late_window)=>{
    const data = await classRepository.editarClass({_id},{name,device_id,course_id,attendance_schedule:{attendance_window,late_window}})
    if(!data){
        return {messageError:'ERROR_MESSAGE'}
    }
    return data
}   

export const agregarHorarioService = async (_id, name,day_of_week) => {
  
    let data = undefined

    try{
     
        data = await classRepository.getModelAggregate.findOneAndUpdate({ _id ,"general_schedule.day_of_week":day_of_week},{
            $set:{
                'general_schedule.$.name':name,
        }})
        if(!data) throw new Error("generate")
    }
    catch(err){
        data = await classRepository.getModelAggregate.findOneAndUpdate({_id},{$push:{'general_schedule':{name,day_of_week}}})
    }
    if (!data) {
        return { messageError: 'ERROR_MESSAGE' };
    }
    return data;
};
export const quitarHorarioService = async (_id, horario_id) => {
    const data = await classRepository.getModelAggregate.findOneAndUpdate({ _id }, {
        $pull: { "general_schedule": { _id: horario_id } }
    });
    if (!data) {
        return { messageError: 'ERROR_MESSAGE' };
    }
    return data;
};

export const agregarSubHorarioService = async (_id, horario_id, start_time,end_time) => {
    const data = await classRepository.getModelAggregate.findOneAndUpdate(
        { _id, "general_schedule._id": horario_id },
        {
            $push: { "general_schedule.$.time": {start_time,end_time} }
        }
    );
    if (!data) {
        return { messageError: 'ERROR_MESSAGE' };
    }
    return data;
};

export const quitarSubHorarioService = async (_id, horario_id, subhorario_id) => {
    const data = await classRepository.getModelAggregate.findOneAndUpdate(
        { _id, "general_schedule._id": horario_id },
        {
            $pull: { "general_schedule.$.time": { _id: subhorario_id } }
        }
    );
    if (!data) {
        return { messageError: 'ERROR_MESSAGE' };
    }
    return data;
};


export const agregarStudentClassService = async(_id,studen_id)=>{

    let data = undefined

    try{
     
        data = await classRepository.getModelAggregate.findOne({ _id ,"students.studen_id":studen_id})
        if(!data) throw new Error("generate")
    }
    catch(err){
        data = await classRepository.getModelAggregate.findOneAndUpdate({_id},{$push:{'students':{studen_id}}})
    }
    if (!data) {
        return { messageError: 'ERROR_MESSAGE' };
    }
    return data;
}   
export const quitarStudentClassService = async(_id,studen_id)=>{
    let data =undefined
    data = await classRepository.getModelAggregate.findOneAndUpdate({_id},{$pull:{
        "students":{studen_id}
    }})
    if(!data){
        return {messageError:'ERROR_MESSAGE'}
    }
    return data
}   

export const obtenerStudentClassService = async(studen_id)=>{

    return await classRepository.obtenerOneClass({"students.studen_id":studen_id},undefined,'attendance_schedule general_schedule')
}  

export const activarClassService = async(_id)=>{
    const data = await classRepository.activarClass(_id)
    return data
}  

export const desactivarClassService = async(_id)=>{
    const data = await classRepository.desactivarClass(_id)
    return data
}  

export const listarClassService = async (body,query,popOptions)=>{
    let filter= undefined
    if(body) filter = {...body}
    
    const data=await classRepository.listaClass(filter,query,"device_id course_id students.studen_id")
  
    return data 
}
  