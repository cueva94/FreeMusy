'use strict'

// Cargamos Express
var express = require ('express');

// Cargamos el controlador para Artista
var ArtistaController = require ('../controllers/Artista');

// Cargamos la funcion de rutas de express
var api = express.Router();

// Cargamos Multiparty (Para la subida de ficheros)
var multipart = require ('connect-multiparty');

// Definimos una ruta para la subida de los archivos
var md_upload = multipart({ uploadDir: './uploads/artistas' }); 

api.get('/artista/:id',ArtistaController.ObtenerArtista);
api.post('/artista', ArtistaController.GuardarArtista);
api.get('/artistas/:page?', ArtistaController.ObtenerArtistas);
api.put('/artista/:id', ArtistaController.ActualizarArtista);
api.delete('/artista/:id', ArtistaController.EliminarArtista);
api.post('/subir-imagen-artista/:id', md_upload, ArtistaController.SubirImagen);
api.get('/obtener-imagen-artista/:imageFile', ArtistaController.ObtenerImagen);


// Exportamos las funcionalidades configuradas

module.exports = api