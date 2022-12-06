'use strict'

// Cargamos el ORM Mongoose
var mongoose = require ("mongoose");
// Seleccionamos el esquema
var Schema = mongoose.Schema;

// Definimos el modelo
var ArtistaSchema = Schema({
    nombre: String,
    descripcion: String,
    imagen: String
});

// Exportamos para poder contar con el modelo Artista
module.exports = mongoose.model('Artista', ArtistaSchema); 