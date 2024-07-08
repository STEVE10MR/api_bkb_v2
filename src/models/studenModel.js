import mongoose from 'mongoose'
import {connection} from './connectDatabase.js';
const Schema = mongoose.Schema

const studenSchema= Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    active: {
        type: Boolean,
        default: true,
        select: true
    }
})
export default connection().model('student', studenSchema);