// Requerir los módulos
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';

// Se importan las rutas del usuario
import routerUsuario from './routers/usuario_routes.js';

import routerConferencista from './routers/conferencista_routes.js';

import routerAuditorio from './routers/auditorio_routes.js';

import routerReserva from './routers/reserva_routes.js';


// Inicializaciones
const app = express()
dotenv.config()

// Configuraciones 
app.set('port',process.env.port || 3000)
app.use(cors())

// Middlewares 
app.use(express.json())

// Rutas 
app.get('/',(req,res)=>{
    res.send("Server on")
})

// Ruta del usuario
app.use('/api/usuario',routerUsuario)

app.use('/api/conferencista',routerConferencista)

app.use('/api/auditorio',routerAuditorio)

app.use('/api/reserva',routerReserva)

// Rutas no encontradas
app.use((req,res)=>res.status(404).send("Endpoint no encontrado - 404"))


// Exportar la instancia de express por medio de app
export default  app