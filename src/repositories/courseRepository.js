import models from "../models/index.js"
import * as handleFactory from "./handleFactory.js"
const {courseModel} = models

export const crearCourse = handleFactory.createOne(courseModel);
export const desactivarCourse = handleFactory.deleteOne(courseModel);
export const activarCourse = handleFactory.activeOne(courseModel);
export const editarCourse = handleFactory.updateOne(courseModel)
export const obtenerCourse = handleFactory.getOneId(courseModel)
export const obtenerOneCourse = handleFactory.getOne(courseModel)
export const listaCourse = handleFactory.getAll(courseModel)
export const obtenerInstancia = handleFactory.getModel(courseModel)