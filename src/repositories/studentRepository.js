import models from "../models/index.js"
import * as handleFactory from "./handleFactory.js"
const {studenModel} = models

export const crearStudent= handleFactory.createOne(studenModel);
export const desactivarStudent= handleFactory.deleteOne(studenModel);
export const activarStudent= handleFactory.activeOne(studenModel);
export const editarStudent= handleFactory.updateOne(studenModel)
export const obtenerStudent= handleFactory.getOneId(studenModel)
export const obtenerOneStudent= handleFactory.getOne(studenModel)
export const listaStudent= handleFactory.getAll(studenModel)
export const obtenerInstancia = handleFactory.getModel(studenModel)