import Auditorio from "../models/auditorio.js";

import mongoose from "mongoose";

// Método para crear un auditorio
const registrarAuditorio = async (req, res) => {
    const { cedula, nombre, ubicacion, capacidad, descripcion } = req.body

    if (Object.values(req.body).includes("")) {
        return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" })
    }

    // Verificar si ya existe un auditorio con el mismo código
    const verificarAuditorioBDD = await Auditorio.findOne({ cedula})
    if (verificarAuditorioBDD) {
        return res.status(400).json({ msg: "Lo sentimos, el codigo del auditorio ya está registrado" })
    }

    try {
        const nuevoAuditorio = new Auditorio({ cedula, nombre,ubicacion,capacidad, descripcion })
        await nuevoAuditorio.save();
        res.status(200).json({ msg: "Auditorio registrado con éxito" })
    } catch (error) {
        res.status(500).json({ msg: "Error al registrar el auditorio" })
    }
}

// Método para listar todos los auditorios
const listarAuditorio = async (req, res) => {
    try {
        const auditorios = await Auditorio.find().select("-__v")
        res.status(200).json(auditorios)
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener el auditorio" })
    }
}

// Método para ver el detalle de un auditorio en particular
const detalleAuditorio = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: `Lo sentimos, no existe el auditorio con ID ${id}` });
    }

    try {
        const auditorio = await Auditorio.findById(id).select("-__v")
        res.status(200).json(auditorio)
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener especialidad" })
    }
}

// Método para actualizar un auditorio 
const actualizarAuditorio = async (req, res) => {
    const { id } = req.params

    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" })

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: `Lo sentimos, no existe lel auditorio con ID ${id}` })
    }

    try {
        await Auditorio.findByIdAndUpdate(id, req.body);
        res.status(200).json({ msg: "Auditorio actualizado con éxito" })
    } catch (error) {
        res.status(500).json({ msg: "Error al actualizar el auditorio" })
    }
}


// Método para eliminar un auditorio
const eliminarAuditorio = async (req, res) => {
    const { id } = req.params;

    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" })

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: `Lo sentimos, no existe el auditorio con ID ${id}` })
    }

    try {
        await Auditorio.findByIdAndDelete(id);
        res.status(200).json({ msg: "Auditorio eliminado con éxito" })
    } catch (error) {
        res.status(500).json({ msg: "Error al eliminar el auditorio" })
    }
}

export{
    registrarAuditorio,
    listarAuditorio,
    detalleAuditorio,
    actualizarAuditorio,
    eliminarAuditorio
}
