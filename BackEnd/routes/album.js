'use strict'

// Cargamos Express
var express = require ('express');

// Cargamos el controlador para Album
var AlbumController = require ('../controllers/album');

// Cargamos la funcion de rutas de express
var api = express.Router();

// Cargamos Multiparty (Para la subida de ficheros)
var multipart = require ('connect-multiparty');

// Definimos una ruta para la subida de los archivos
var md_upload = multipart({ uploadDir: './uploads/album' }); 



// Definimos las funciones que van a ser escuchada en la api del Usuario
api.get('/album/:id', AlbumController.ObtenerAlbum);
api.post('/album', AlbumController.GuardarAlbum);
api.get('/albums/:artista?', AlbumController.ObtenerAlbums);

api.get('/albums', AlbumController.ObtenerPaginaAlbums);

api.put('/album/:id', AlbumController.ActualizarAlbum);
api.delete('/album/:id', AlbumController.BorrarAlbum);
api.post('/subir-imagen-album/:id',  md_upload , AlbumController.SubirImagen);
api.get('/obtener-imagen-album/:imageFile' , AlbumController.ObtenerImagen);


// Exportamos las funcionalidades configuradas
module.exports = api