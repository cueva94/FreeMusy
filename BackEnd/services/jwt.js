'use strict'

// Cargamos JWT (encriptación)
var jwt = require('jwt-simple');
// Cargamos Moment (gestionar fecha y hora)
var moment = require('moment');
// Creamos una clave secreta: Dicha clave es utilizada a la hora de generar los tokens
var secret = 'clave_secreta';

// Exportamos la funcionalidad de creación de tokens.
exports.createToken = function (usuario){
    var payload = {
        sub : usuario._id,
        nombre: usuario.nombre,
        apellidos: usuario.apellidos,
        email: usuario.email,
        rol: usuario.rol,
        imagen: usuario.imagen,
        iat: moment().unix(),
        exp: moment().add(30, 'Dias').unix
    };

return jwt.encode(payload, secret)


};