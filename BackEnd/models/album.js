'use strict'


// Cargamos el ORM Mongoose
var mongoose = require ("mongoose");

// Seleccionamos el esquema
var Schema = mongoose.Schema;

// Definimos el modelo
var AlbumSchema = Schema({
    
    title: String,
    descripcion: String,
    year: Number,
    imagen: String,
    artista: {type: Schema.ObjectId, ref: 'Artista'}
});

// Exportamos para poder contar con el modelo Album
module.exports = mongoose.model('Album', AlbumSchema); 