import models from "../models/index.js"
import * as handleFactory from "./handleFactory.js"
const {deviceModel} = models

export const creardeviceModel= handleFactory.createOne(deviceModel);
export const desactivardeviceModel= handleFactory.deleteOne(deviceModel);
export const activardeviceModel= handleFactory.activeOne(deviceModel);
export const editardeviceModel= handleFactory.updateOne(deviceModel)
export const obtenerdeviceModel= handleFactory.getOneId(deviceModel)
export const obtenerOnedeviceModel= handleFactory.getOne(deviceModel)
export const listadeviceModel= handleFactory.getAll(deviceModel)
export const obtenerInstancia = handleFactory.getModel(deviceModel)