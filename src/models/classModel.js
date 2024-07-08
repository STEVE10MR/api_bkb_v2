import mongoose from "mongoose";
import {connection} from './connectDatabase.js';
const Schema = mongoose.Schema

const classSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    device_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'device', 
        required: true 
    },
    course_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'course', 
        required: true 
    },
    students:[{
        studen_id:{
            type:Schema.Types.ObjectId,
            ref:"student"
        }
    }],
    general_schedule: [
        {
            name:{
                type:String,
            },
            day_of_week: { 
                type: String, 
                enum: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
            },
            time:[{
                start_time: { 
                    type: String, 
                },
                end_time: { 
                    type: String, 
                }
            }]
        }
    ],
    attendance_schedule: {
        attendance_window: { 
            type: Number, 
            min: 0
        }, 
        late_window: { 
            type: Number, 
            min: 0
        }
    },
    active: {
        type: Boolean,
        default: true
    }
});

export default connection().model('class', classSchema);