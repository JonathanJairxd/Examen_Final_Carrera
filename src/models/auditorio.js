import {Schema, model} from 'mongoose'

const auditorioSchema = new Schema({
    cedula:{
        type:Number,
        required:true,
        trim:true
    },
    nombre:{
        type:String,
        required:true,
        trim:true
    },
    ubicacion:{
        type:String,
        required:true,
        trim:true
    },
    capacidad:{
        type:Number,
        required:true,
        trim:true
    },
    descripcion:{
        type:String,
        required:true,
        trim:true,
    }

})

export default model('Auditorio', auditorioSchema)