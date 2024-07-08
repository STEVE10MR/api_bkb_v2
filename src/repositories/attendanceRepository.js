import models from "../models/index.js"
import * as handleFactory from "./handleFactory.js"
const {attendanceModel} = models

export const crearAttendance= handleFactory.createOne(attendanceModel);
export const desactivarAttendance= handleFactory.deleteOne(attendanceModel);
export const activarAttendance= handleFactory.activeOne(attendanceModel);
export const editarAttendance= handleFactory.updateOne(attendanceModel)
export const obtenerAttendance= handleFactory.getOneId(attendanceModel)
export const obtenerOneAttendance= handleFactory.getOne(attendanceModel)
export const listaAttendance= handleFactory.getAll(attendanceModel)
export const obtenerInstancia = handleFactory.getModel(attendanceModel)