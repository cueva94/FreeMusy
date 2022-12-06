'use strict'

// Cargamos el ORM Mongoose
var mongoose = require ("mongoose");
// Seleccionamos el esquema
var Schema = mongoose.Schema;


// Definimos el modelo
var UsuarioSchema = Schema({
    nombre: String,
    apellidos: String,
    email: String,
    password: String,
    rol: String,
    imagen: String
});

// Exportamos para poder contar con el modelo Usuario
module.exports = mongoose.model('Usuario', UsuarioSchema);