'use strict'

// Cargamos Path y FS para manejar ficheros

var path = require ('path');
var fs = require ('fs');


var mongoosePaginate = require ('mongoose-pagination')

// Cargamos los modelos Artista, Album y Cancion

var Artista = require('../models/Artista');
var Album = require('../models/Album');
var Cancion = require('../models/Cancion');


// Función para guardar una Canción: Se debe pasar por el cuerpo de la peticion los datos de la canción

function GuardarCancion(req, res){

    var cancion = new Cancion();
    var params = req.body;

    cancion.numero = params.numero;
    cancion.nombre = params.nombre;
    cancion.duracion = params.duracion;
    cancion.file = null;
    cancion.album = params.album;

    cancion.save((err, cancionStored) => {

if(err){
    res.status(500).send({message: 'Error en el servidor'});
}else{
    if(!cancionStored){
        res.status(404).send({message: 'No se a guardado la cacion'});
    }else{
           res.status(200).send({cancion});

    }
}

    });

}

// Función para obtener una canción: Requiere ID

function ObtenerCancion(req, res){
   var cancionId = req.params.id;

   Cancion.findById(cancionId).populate({path: 'album'}).exec((err, cancion) => {
    if(err){
        res.status(500).send({message: 'Error en la peticion'});
    }else{
        if(!cancion){
        res.status(404).send({message: 'La cancion no existe'});
        }else{
        res.status(200).send({cancion});
        }
    }

   })
}

// Función para obtener varias canciones: Si se define el ID del album devuelve sus canciones, sino devuele todos

function ObtenerCanciones (req, res){

    var albumId = req.params.album;

    if(!albumId){
        var find = Cancion.find({}).sort('numero');
    }else{
        var find = Cancion.find({album: albumId}).sort('')
    }
    find.populate({ path: 'album',populate: { path: 'artista', model: 'Artista' }

    }).exec(function(err, canciones){

        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else{
        if(!canciones){
            res.status(404).send({message: 'No hay canciones'});
        }else{
          return  res.status(200).send({canciones});
        }

    }

    });
}

// Función para actualizar los datos de una canción: Se deben pasar los datos de la canción por el cuerpo de la peticion y por parametro el ID

function ActualizarCancion(req, res){

    var cancionId = req.params.id;
var actualizar = req.body;

Cancion.findByIdAndUpdate(cancionId , actualizar, (err, cancionActualizada) => {
if(err){
    res.status(500).send({message: 'Error al guardar el artista'});
}else{
    if(!cancionActualizada){
        res.status(404).send({message: 'Cancion no ha sido actualizado'});
    }else{
    res.status(200).send({cancion: cancionActualizada});

    }
}

});


}

// Función para borrar una canción: Se debe especificar el ID de la Canción

function BorrarCancion (req, res){
    var cancionId = req.params.id;
    
    
    Cancion.findByIdAndRemove( cancionId, (err, cancionBorrada) => {
    
        if(err){
            res.status(500).send({message: 'Error al eliminar el Cancion'});
        
        }else{
        if(!cancionBorrada){
            res.status(404).send({message: 'La cancion no ha sido eliminado'});
        }else{
                    res.status(200).send({ cancion: cancionBorrada});
    
                   }
    
                 }
               });
}
    
// Función para subir una canción: Se debe enviar en el contenido del cuerpo de la peticion un archivo denominado files y de tipo file

function SubirCancion(req, res){

    var cancionId = req.params.id
    var file_name = 'cancion no subida';

if(req.files){

var file_path = req.files.file.path;
var file_split = file_path.split('\/');
var file_name = file_split[2];

var ext_split = file_name.split( '\.');
var file_ext = ext_split[1];

if (file_ext == 'mp3' || file_ext == 'ogg' ){

    Cancion.findByIdAndUpdate( cancionId, {file: file_name}, (err,  cancionActualizada)=> {

    if(!cancionActualizada){
        res.status(404).send({message: 'No se a podido actualizar la cancion'});
        }else{
        res.status(200).send({ cancion : cancionActualizada});
        }
       });
}else{
    res.status(200).send({message: 'Extension del archivo no valida'});  
   }
  }
}

// Función creada para mostrar un archivo: Se debe pasar por parametro el ID de la canción(De esta forma se protegen los recursos)

function ArchivoCancion(req, res){

var imagenFile = req.params.cancionFile;
var path_file = './uploads/canciones/'+ imagenFile;


fs.exists(path_file, function(exists){
    if(exists){
        res.sendFile(path.resolve(path_file));
    }else{
        res.status(200).send({message: 'No existe el fichero de audio...'});
    }
});
}


// Exportamos las funciones para poder ser utilizadas desde las rutas            

module.exports = {
    ObtenerCancion, GuardarCancion, ObtenerCanciones,
    ActualizarCancion, BorrarCancion, SubirCancion, ArchivoCancion
}