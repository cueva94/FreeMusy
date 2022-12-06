'use strict'

// Cargamos Express
var express = require ('express');

// Cargamos el controlador para Canción
var CancionController = require ('../controllers/cancion');

// Cargamos la funcion de rutas de express
var api = express.Router();

// Cargamos Multiparty (Para la subida de ficheros)
var multipart = require ('connect-multiparty');

// Definimos una ruta para la subida de los archivos
var md_upload = multipart({ uploadDir: './uploads/canciones' }); 

api.get('/cancion/:id', CancionController.ObtenerCancion);
api.post('/cancion',  CancionController.GuardarCancion);
api.get('/canciones/:album?', CancionController.ObtenerCanciones);
api.put('/cancion/:id', CancionController.ActualizarCancion);
api.delete('/cancion/:id', CancionController.BorrarCancion);
api.post('/subir-archivo-cancion/:id', md_upload, CancionController.SubirCancion);
api.get('/archivo-cancion/:cancionFile', CancionController.ArchivoCancion);


// Exportamos las funcionalidades configuradas
module.exports = api;