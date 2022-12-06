"use strict";


// Cargamos Path y FS para manejar ficheros
var path = require("path");
var fs = require("fs");


// Cargamos los modelos Artista, Album y Cancion
var artista = require("../models/Artista");
var Album = require("../models/Album");
var Cancion = require("../models/Cancion");



// Función para guardar un Album: Se debe pasar por el cuerpo de la peticion los datos del album

function GuardarAlbum(req, res) {
  var album = new Album();

  var params = req.body;

  album.title = params.title;
  album.descripcion = params.descripcion;
  album.year = params.year;
  album.imagen = "null";
  album.artista = params.artista;

  album.save((err, albumStored) => {
    if (err) {
      res.status(500).send({ message: "Error en lel servidor" });
    } else {
      if (!album) {
        res.status(404).send({ message: "No se a guardado el album" });
      } else {
        res.status(200).send({ album: albumStored });
      }
    }
  });
}

// Función para guardar un Album: Se debe pasar por el cuerpo de la peticion los datos del album
function ObtenerAlbum(req, res) {
  var albumId = req.params.id;

  Album.findById(albumId) .populate("artista").exec((err, album) => {
      if (err) {
        res.status(500).send({ message: "Error en la peticion" });
      } else {
        if (!album) {
          res.status(404).send({ message: "El album no existe" });
        } else {
          res.status(200).send({ album });
        }
      }
    });
}


// Función para obtener varios albums: Si se define el ID del artista devuelve sus albums, sino devuele todos
function ObtenerAlbums(req, res) {
  var artistaId = req.params.artista;
  if (!artistaId) {
    // Sacar todos los albums de la bbdd
    var find = Album.find({}).sort('title');

  } else {
    //Sacar los albums de un artista concreto de la bbdd
    var find = Album.find({ artista: artistaId }).sort('year');
  }


	// La función Populate obtiene el objeto a partir del ID y nos proporciona todos sus datos

  find.populate('artista').exec((err, albums) => {
    if (err) {
      res.status(500).send({ message: "Error en la peticion" });
    } else {
      if (!albums) {
        res.status(404).send({ message: "El album no existe" });
      } else {
        res.status(200).send({ albums });
      }
    }
  });
}


function ObtenerPaginaAlbums (req, res){
 
      Album.find().sort(' title').paginate( function(err, albums){
  if(err){
      res.status(500).send({message: 'Error en la peticion'});
  }else{
  if(!albums){
      res.status(404).send({message: 'No hay album'});
  }else{
    return  res.status(200).send(albums);
  }
  }
    
      });
  }
  
// Función para actualizar un album: Se deben pasar los datos del album por el cuerpo de la peticion y por parametro el ID del album  

function ActualizarAlbum(req, res) {
  var albumId = req.params.id;
  var actualizar = req.body;

  Album.findByIdAndUpdate(albumId, actualizar, (err, albumActualizado) => {
    if (err) {
      res.status(500).send({ message: "Error en la peticion" });
    } else {
      if (!albumActualizado) {
        res.status(404).send({ message: "El album no se a actualizado " });
      } else {
        res.status(200).send({ album: albumActualizado });
      }
    }
  });
}

// Función para borrar un album: Se debe especificar el ID del Album (Si se elimina un album tambien se borran las canciones que contenga)

function BorrarAlbum(req, res) {
  var albumId = req.params.id;

  Album.findByIdAndRemove(albumId, (err, albumRemoved) => {
    if (err) {
      res.status(500).send({ message: "Error al eliminar el album" });
    } else {
      if (!albumRemoved) {
        res.status(404).send({ message: "El album no ha sido eliminado" });
      } else {
        Cancion
          .find({ album: albumRemoved._id })
          .remove((err, cancionRemoved) => {
            if (err) {
              res.status(500).send({ message: "Error al eliminar la cancion" });
            } else {
              if (!cancionRemoved) {
                res
                  .status(404)
                  .send({ message: " La cancion no ha sido eliminada " });
              } else {
                res.status(200).send({ album: albumRemoved });
              }
            }
          });
      }
    }
  });
}

// Función para subir una imagen: Se debe enviar en el contenido del cuerpo de la peticion un archivo denominado files y de tipo file

function SubirImagen(req, res){

var albumId = req.params.id;
var file_name = 'No subido...';

if(req.files){
  var file_path = req.files.imagen.path;
  var file_split = file_path.split('\/');
  var file_name = file_split[2];

  var ext_split = file_name.split('\.');
  var file_ext = ext_split[1];
  
if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){

    Album.findByIdAndUpdate(albumId, {imagen: file_name}, (error, albumActualizado) => {
      if(!albumId){
        res.status(404).send({message: 'No se ha podido actualizar el Album'});
      }else{
        res.status(200).send({ album: albumActualizado });
      }
    });

  }else{
    res.status(200).send({message: 'Extensión del archivo no valida'});
  }
  
}else{
  res.status(200).send({message: 'No has subido ninguna imagen...'});
}
}

// Función creada para mostrar una imagen: Se debe pasar por parametro el ID del album(De esta forma se protegen los recursos)

function ObtenerImagen(req, res){

  var imageFile = req.params.imageFile;
  var path_file = './uploads/album/'+imageFile;
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
  ObtenerAlbum,
  GuardarAlbum,
  ObtenerAlbums,
  ActualizarAlbum,
  BorrarAlbum,
  SubirImagen,
  ObtenerImagen,
  ObtenerPaginaAlbums
};
