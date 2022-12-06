"use strict";

// Cargamos Path y FS para manejar ficheros

var fs = require("fs");
var path = require("path");

// Cargamos Bcrypt (encriptar la contraseña)

var bcrypt = require("bcrypt-nodejs");

// Cargamos el modelo de usuario
var Usuario = require("../models/Usuario");

// Cargamos JWT (para generar Tokens)
var jwt = require("../services/jwt");

// Guardamos un usuario

function GuardarUsuario(req, res) {
  var usuario = new Usuario();
  var params = req.body;

  usuario.nombre = params.nombre;
  usuario.apellidos = params.apellidos;
  usuario.email = params.email;
  usuario.rol = "ROLE_USUARIO";
  usuario.imagen = "null";

  if (params.password) {
    // Encriptar contraseña y guardar datos
    bcrypt.hash(params.password, null, null, function (err, hash) {
      usuario.password = hash;
      if (
        usuario.nombre != null && usuario.apellidos != null && usuario.email != null
       ) {
        // Guardar el usuario
        usuario.save((err, usuarioStored) => {
          if (err) {
            res.status(500).send({ message: "Error al guardar el usuario" });
          } else {
            if (!usuarioStored) {
              res.status(404).send({ message: "No se a registrado el usuario" });
            } else {
              res.status(200).send({ usuario: usuarioStored });
            }
          }
        });
      } else {
        res.status(200).send({ message: "Rellena todos los campos" });
      }
    });
  } else {
    res.status(200).send({ message: "Introduce la contraseña" });
  }
}

// Funcion para logearse en la API. 

function loginUsuario(req, res) {
  var params = req.body;
  var email = params.email;
  var password = params.password;

  Usuario.findOne({email: email.toLowerCase()}, (err, usuario) => {
    if (err) {
      res.status(500).send({ message: "Error en la petición" });
    } else {
      if (!usuario) {
        res.status(404).send({ message: "El usuario no registrado" });
      } else {
        //Comprobar la contraseña

        bcrypt.compare(password, usuario.password, function (err, check) {
          if (check){
            // Devolver los datos del usuario logueado
            if (params.gethash) {
              // Devolver un token de jwt

              res.status(200).send({token: jwt.createToken(usuario)});
            } else {
              res.status(200).send({usuario});
            }
          } else {
            res.status(404).send({ message: "El usuario no a podido loguearse" });
          }
        });
      }
    }
  });
}

// Función para actualizar un usuario: Se deben pasar los datos por el cuerpo de la peticion y por parametro el ID del usuario

function actualizarUsuario(req, res) {
  var usuarioId = req.params.id;
  var update = req.body;

  Usuario.findByIdAndUpdate(usuarioId,update,(err, usuarioActualizado) => {
      if (err) {
        res.status(404).send({ message: "Error actualizar el usuario" });
      } else {

        if (!usuarioActualizado) {
          res
            .status(404) .send({ message: "No se a podido actualizar el usuario" });
        } else {
          res.status(200).send({ usuario: usuarioActualizado });
        }
      }
    }
  );
}

// Función para subir una imagen: Se debe enviar en el contenido del cuerpo de la peticion un archivo denominado files y de tipo file

function subirImagen(req, res) {
  var usuarioId = req.params.id;
	var file_name = 'No subido...';

	if(req.files){
		var file_path = req.files.imagen.path;
		var file_split = file_path.split('\/');
		var file_name = file_split[2];

		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];
		
 if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){

			Usuario.findByIdAndUpdate(usuarioId, {imagen: file_name}, (error, usuarioActualizado) => {
				if(!usuarioActualizado){
					res.status(404).send({message: 'No se ha podido actualizar el usuario'});
				}else{
					res.status(200).send({imagen: file_name, usuario: usuarioActualizado});
				}
			});

		}else{
			res.status(200).send({message: 'Extensión del archivo no valida'});
		}
		
	}else{
		res.status(200).send({message: 'No has subido ninguna imagen...'});
	}
}

// Función creada para mostrar una imagen: Se debe pasar por parametro el ID del usuario(De esta forma se protegen los recursos)

function ObtenerImagenUsuario(req, res) {
  var imageFile = req.params.imageFile;
  var path_file = "./uploads/usuario/" +imageFile;
	fs.exists(path_file, function(exists){
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message: 'No existe la imagen...'});
		}
	});
}

// Exportamos las funciones para poder ser utilizadas desde las rutas

module.exports = {
  
  GuardarUsuario,
  loginUsuario,
  actualizarUsuario,
  subirImagen,
  ObtenerImagenUsuario,
};
 