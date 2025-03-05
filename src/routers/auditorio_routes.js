import {Router} from 'express'

const router = Router()

import { registrarAuditorio, listarAuditorio, detalleAuditorio,
    actualizarAuditorio,eliminarAuditorio
} from '../controllers/auditorio_controller.js'


import verificarAutenticacion from "../middlewares/autenticacion.js";

router.post("/registro", verificarAutenticacion ,registrarAuditorio)
    
router.get("/listar", verificarAutenticacion ,listarAuditorio)

router.get("/detalle/:id", verificarAutenticacion ,detalleAuditorio)

router.put("/actualizar/:id", verificarAutenticacion ,actualizarAuditorio)

router.delete("/eliminar/:id", verificarAutenticacion ,eliminarAuditorio)

export default router