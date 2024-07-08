import mongoose from "mongoose";
import {connection} from './connectDatabase.js';
const Schema = mongoose.Schema

const attendanceSchema = new mongoose.Schema({
    student_id: { type: Schema.Types.ObjectId, ref: 'student' },
    class_id: { type: Schema.Types.ObjectId, ref: 'class' },
    tiempoRestante: { type: Date },
    status: { type: String,  default:"falta",enum: ['Asiste', 'Tardanza', 'falta'] },
  });

  export default connection().model('attendance', attendanceSchema);