import mongoose from "mongoose";
import {connection} from './connectDatabase.js';
const Schema = mongoose.Schema

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    active: {
        type: Boolean,
        default: true,
        select: true
    }
});

export default connection().model('course', courseSchema);