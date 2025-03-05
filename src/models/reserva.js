import mongoose, { Schema, model } from "mongoose";

const reservaSchema = new Schema({
    codigo:{
        type:String,
        required: true,
        trim:true,
        unique:true
    },
    descripcion:{
        type:String,
        required: true,
        trim:true
    },
    id_conferencista: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "conferencista",
        required: true
    },
    id_auditorio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "auditorio",
        required: true
    }
}, {
    timestamps: true
});

export default model("Reserva", reservaSchema);
