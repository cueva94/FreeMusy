'use strict'

// Cargamos el ORM Mongoose
var mongoose = require ("mongoose");

// Seleccionamos el esquema
var Schema = mongoose.Schema;

// Definimos el modelo
var CancionSchema = Schema({
    numero: Number,
    nombre: String,
    duracion: String,
    file:String,
    album:{ type: Schema.ObjectId, ref:'Album'}
});


// Exportamos para poder contar con el modelo Cancion
module.exports = mongoose.model('Cancion', CancionSchema); 