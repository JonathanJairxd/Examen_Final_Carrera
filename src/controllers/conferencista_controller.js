import conferencista from "../models/conferencista.js"
import Conferencista from "../models/conferencista.js"
import mongoose from "mongoose"

// Metodo para crear un conferencista

const registrarConferencista = async (req, res) => {

    // desestructurar el email
    const { email } = req.body

    //  Validar todos los camposs
    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" })

    // Obtener el usuario en base al email
    const verificarEmailBDD = await Conferencista.findOne({ email })

    // Verificar si el conferencista ya se encuentra registrado
    if (verificarEmailBDD) return res.status(400).json({ msg: "Lo sentimos, el email ya se encuentra registrado" })
    
    try{
        // Crear una instancia del Paciente
        const nuevoConferencista = new Conferencista(req.body)
        // Guardar en BDD
        await nuevoConferencista.save()
        // Presentar resultados
        res.status(200).json({ msg: "Conferencista registrado con éxito" })
    } catch(error){
        res.status(500).json({ msg: "Error al registrar al conferencista" })
    }
}

// Método para listar todos los conferencistas 

const listarConferencista = async (req, res) => {
    try {
        const conferencistas = await Conferencista.find().select("-createdAt -updatedAt -__v")
        res.status(200).json(conferencistas)
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener al conferencista" })
    }
}

// Método para ver el detalle de un conferencista en particular

const detalleConferencista = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: `Lo sentimos, no existe el conferencista con ID ${id}` })
    }

    try {
        const conferencista = await Conferencista.findById(id).select("-createdAt -updatedAt -__v")
        res.status(200).json(conferencista)
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener al conferencista" })
    }
}


// Método para actualizar un paciente (CRUD - Update)
const actualizarConferencista = async (req, res) => {
    const { id } = req.params

    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" })

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: `Lo sentimos, no existe el conferencista con ID ${id}` })
    }

    try {
        await Conferencista.findByIdAndUpdate(id, req.body);
        res.status(200).json({ msg: "Conferencista actualizado con éxito" })
    } catch (error) {
        res.status(500).json({ msg: "Error al actualizar al conferencista" })
    }
}

// Método para eliminar (dar de baja) un paciente (CRUD - Delete)
const eliminarConferencista= async (req, res) => {
    const { id } = req.params

    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" })

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: `Lo sentimos, no existe el conferencista con ID ${id}` });
    }

    try {
        await Conferencista.findByIdAndDelete(id);
        res.status(200).json({ msg: "Conferencista eliminado con éxito" });
    } catch (error) {
        res.status(500).json({ msg: "Error al eliminar al conferensista" });
    }
}


export {
    registrarConferencista,
    listarConferencista,
    detalleConferencista,
    actualizarConferencista,
    eliminarConferencista 
}
