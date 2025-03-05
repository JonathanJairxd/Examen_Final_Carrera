import Reserva from "../models/reserva.js"

import mongoose from "mongoose"

// Método para crear una reserva
const registrarReserva = async (req, res) => {
    const { codigo, descripcion, id_conferencista, id_auditorio } = req.body

    if (Object.values(req.body).includes("")) {
        return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" })
    }

    // Verificar si ya existe una reserva con el mismo código
    const verificarReservaBDD = await Reserva.findOne({ codigo })
    if (verificarReservaBDD) {
        return res.status(400).json({ msg: "Lo sentimos, el código de la reserva ya está registrado" })
    }

    // Verificar que el conferencista y el auditorio existan
    if (!mongoose.Types.ObjectId.isValid(id_conferencista) || !mongoose.Types.ObjectId.isValid(id_auditorio)) {
        return res.status(400).json({ msg: "Conferencista o Auditorio no válidos" });
    }

    try {
        const nuevaReserva = new Reserva({ codigo, descripcion, id_conferencista, id_auditorio })
        await nuevaReserva.save();
        res.status(200).json({ msg: "Reserva registrada con éxito" })
    } catch (error) {
        res.status(500).json({ msg: "Error al registrar la reserva" })
    }
}

// Método para listar todas las reservas
const listarReservas = async (req, res) => {
    try {
        const reservas = await Reserva.find()
            .select("-createdAt -updatedAt -__v")
            .populate("id_conferencista", "nombre apellido email")
            .populate("id_auditorio", "nombre");
        res.status(200).json(reservas);
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener la reserva" });
    }
}

// Método para ver el detalle de una reserva en particular
const detalleReserva = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: `Lo sentimos, no existe la reserva con ID ${id}` });
    }

    try {
        const reserva = await Reserva.findById(id)
            .select("-createdAt -updatedAt -__v")
            .populate("id_conferencista", "nombre apellido email")
            .populate("id_auditorio", "nombre");

        res.status(200).json(reserva);
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener la reserva" });
    }
}

// Método para actualizar una Reserva
const actualizarReserva = async (req, res) => {
    const { id } = req.params

    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" })

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: `Lo sentimos, no existe la reserva con ID ${id}` })
    }

    try {
        await Reserva.findByIdAndUpdate(id, req.body);
        res.status(200).json({ msg: "Reserva actualizada con éxito" })
    } catch (error) {
        res.status(500).json({ msg: "Error al actualizar la reserva" })
    }
}

// Método para eliminar una reserva
const eliminarReserva = async (req, res) => {
    const { id } = req.params

    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" })

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: `Lo sentimos, no existe la reserva con ID ${id}` })
    }

    try {
        await Reserva.findByIdAndDelete(id)
        res.status(200).json({ msg: "Reserva eliminada con éxito" })
    } catch (error) {
        res.status(500).json({ msg: "Error al eliminar la reserva" })
    }
}

export{
    registrarReserva,
    listarReservas,
    detalleReserva,
    actualizarReserva,
    eliminarReserva
}