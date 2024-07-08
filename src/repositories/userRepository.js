import models from "../models/index.js"
import * as handleFactory from "./handleFactory.js"
const {userModel} = models

export const crearUser = handleFactory.createOne(userModel);
export const desactivarUser = handleFactory.deleteOne(userModel);
export const activarUser = handleFactory.activeOne(userModel);
export const editarUser = handleFactory.updateOne(userModel)
export const obtenerUserId = handleFactory.getOneId(userModel)
export const obtenerUser = handleFactory.getOne(userModel)
export const listaUser = handleFactory.getAll(userModel)
export const obtenerInstancia = handleFactory.getModel(userModel)