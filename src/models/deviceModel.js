import mongoose from "mongoose";
import {connection} from './connectDatabase.js';
import { v4 as uuidv4 } from 'uuid';
const Schema = mongoose.Schema

const deviceSchema = new Schema({
    name:{type: String,require:true},
    status: { type: String,default:'Activo',enum: ['Activo', 'Inactivo'] },
    ESP32_token:{type: String,default: () => uuidv4()},
    last_active: { type: Date,default:Date.now() },
    class_id: { type: mongoose.Schema.Types.ObjectId, ref: 'class' },
    active: {
        type: Boolean,
        default: true,
        select: true
    }
});

export default connection().model('device', deviceSchema);