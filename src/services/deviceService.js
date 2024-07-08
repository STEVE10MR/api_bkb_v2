import * as deviceRepository from "../repositories/deviceRepository.js"

export const crearDeviceService = async(name)=>{
    const data = await deviceRepository.creardeviceModel({name})
    return data
}   

export const editarDeviceService = async(_id,name)=>{
    const data = await deviceRepository.editardeviceModel({_id},{name})
    return data
}   

export const activarDeviceService = async(_id)=>{
    const data = await deviceRepository.activardeviceModel(_id)
    return data
}  

export const desactivarDeviceService = async(_id)=>{
    const data = await deviceRepository.desactivardeviceModel(_id)
    return data
}  

export const listarDeviceService = async (body,query,popOptions)=>{
    let filter= undefined
    if(body) filter = {...body}
    
    const data=await deviceRepository.listadeviceModel(filter,query,popOptions)
  
    return data 
}
  