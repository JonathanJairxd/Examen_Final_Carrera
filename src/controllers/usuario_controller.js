import Usuario from '../models/usuario.js'

import generarJWT from "../helpers/crearJWT.js"
import dotenv from "dotenv";

dotenv.config();

const login = async (req, res) => { 
    // Se toman los datos del request
    const { email, password } = req.body;

    console.log("Se ha ingresado a la api")
    // Verificar si se enviaron todos los campos
    if (!email || !password) {
        return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" });
    }

    // Buscar el usuario en la base de datos
    let usuarioBDD = await Usuario.findOne({ email });

   // Si no existe, crearlo SOLO si las credenciales coinciden con el .env
   if (!usuarioBDD) {
    if (email === process.env.USUARIO_EMAIL && password === process.env.USUARIO_PASSWORD) {
        const newUsuario= new Usuario({
            nombre: "Jonathan",
            apellido: "Ramirez",
            email: process.env.USUARIO_EMAIL,
            password: await new Usuario().encrypPassword(process.env.USUARIO_PASSWORD),
        });

        await newUsuario.save();
        return res.status(201).json({ msg: "Usuario creado y autenticado", usuarioInfo: newUsuario });
    } else {
        return res.status(404).json({ msg: "Credenciales Incorrectas" })
    }
}
    // Verificar la contraseña
    const verificarPassword = await usuarioBDD.matchPassword(password);
    if (!verificarPassword) {
        return res.status(401).json({ msg: "Correo o contraseña incorrectos" });
    }

    // Crear un token JWT 
    const token = generarJWT(usuarioBDD._id, "Usuario")

    // Mostrar los datos del usuario autenticado
    const { nombre, apellido, _id} = usuarioBDD;
    res.status(200).json({
        token,
        nombre,
        apellido,
        _id,
        email: usuarioBDD.email,
        msg: "Bienvenido, " + nombre // Mensaje de bienvenida
    });
};



export default login;