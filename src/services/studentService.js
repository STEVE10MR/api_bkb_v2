import * as studentRepository from "../repositories/studentRepository.js"

export const obtenerStudentService = async(code)=>{
    const data = await studentRepository.obtenerOneStudent({code})
    return data
}   

export const crearStudentService = async(name,code)=>{
    const data = await studentRepository.crearStudent({name,code})
    return data
}   
export const editarStudentService = async(_id,name,code)=>{
    const data = await studentRepository.editarStudent({_id},{name,code})
    return data
}   

export const activarStudentService = async(_id)=>{
    const data = await studentRepository.activarStudent(_id)
    return data
}  

export const desactivarStudentService = async(_id)=>{
    const data = await studentRepository.desactivarStudent(_id)
    return data
}  

export const listarStudentService = async (body,query,popOptions)=>{
    let filter= undefined
    if(body) filter = {...body}
    
    const data=await studentRepository.listaStudent(filter,query,popOptions)
  
    return data 
}
  