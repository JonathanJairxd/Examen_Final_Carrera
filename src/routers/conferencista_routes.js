import {Router} from 'express'

const router = Router()

import { registrarConferencista, listarConferencista, detalleConferencista, 
    actualizarConferencista, eliminarConferencista } 
    from '../controllers/conferencista_controller.js';

import verificarAutenticacion from "../middlewares/autenticacion.js";

router.post("/registro", verificarAutenticacion ,registrarConferencista)

router.get("/listar", verificarAutenticacion ,listarConferencista)

router.get("/detalle/:id", verificarAutenticacion ,detalleConferencista)

router.put("/actualizar/:id", verificarAutenticacion ,actualizarConferencista)

router.delete("/eliminar/:id", verificarAutenticacion ,eliminarConferencista)

export default router