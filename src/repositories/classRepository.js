import models from "../models/index.js"
import * as handleFactory from "./handleFactory.js"
const {classModel} = models

export const crearClass= handleFactory.createOne(classModel);
export const desactivarClass= handleFactory.deleteOne(classModel);
export const activarClass= handleFactory.activeOne(classModel);
export const editarClass= handleFactory.updateOne(classModel)
export const obtenerClass= handleFactory.getOneId(classModel)
export const obtenerOneClass= handleFactory.getOne(classModel)
export const listaClass= handleFactory.getAll(classModel)
export const obtenerInstancia = handleFactory.getModel(classModel)
export const getModelAggregate = handleFactory.getModelAggregate(classModel)