'use strict'


// Cargamos Express
var express = require ('express');

// Cargamos el controlador para usuario
var UsuarioController = require ('../controllers/Usuario');

// Cargamos la funcion de rutas de express
var api = express.Router();

// Cargamos Multiparty (Para la subida de ficheros)
var multipart = require ('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/usuario' }); 


// Definimos las funciones que van a ser escuchada en la api del Usuario
api.post ('/registro', UsuarioController.GuardarUsuario);
api.post ('/login', UsuarioController.loginUsuario);
api.put ('/actualizarUsuario/:id', UsuarioController.actualizarUsuario);
api.post('/Subir-Imagen-Usuario/:id' ,md_upload, UsuarioController.subirImagen);
api.get('/Obtener-Imagen-Usuario/:imageFile' ,UsuarioController.ObtenerImagenUsuario);


// Exportamos las funcionalidades configuradas
module.exports = api;