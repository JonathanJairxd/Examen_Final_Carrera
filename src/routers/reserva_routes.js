import {Router} from 'express'

const router = Router()

import { registrarReserva, listarReservas, detalleReserva,
    actualizarReserva, eliminarReserva
} from '../controllers/reserva_controller.js'

import verificarAutenticacion from "../middlewares/autenticacion.js";

router.post("/registro", verificarAutenticacion ,registrarReserva)

router.get("/listar", verificarAutenticacion ,listarReservas)

router.get("/detalle/:id", verificarAutenticacion ,detalleReserva)

router.put("/actualizar/:id", verificarAutenticacion ,actualizarReserva)

router.delete("/eliminar/:id", verificarAutenticacion ,eliminarReserva)

export default router