import * as courseRepository from "../repositories/courseRepository.js"

export const crearCourseService = async(name)=>{
    const data = await courseRepository.crearCourse({name})
    return data
}   

export const editarCourseService = async(_id,name)=>{
    const data = await courseRepository.editarCourse({_id},{name})
    return data
}   

export const activarCourseService = async(_id)=>{
    const data = await courseRepository.activarCourse(_id)
    return data
}  

export const desactivarCourseService = async(_id)=>{
    const data = await courseRepository.desactivarCourse(_id)
    return data
}  

export const listarCourseService = async (body,query,popOptions)=>{
    let filter= undefined
    if(body) filter = {...body}
    
    const data=await courseRepository.listaCourse(filter,query,popOptions)
  
    return data 
}
  