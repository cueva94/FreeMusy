'use strict'

// Cargamos Path y FS para manejar ficheros
var path = require ('path');
var fs = require ('fs');

// Cargamos "Mongoose Pagination" para crear una paginación con la lista de albums 

var mongoosePaginate = require ('mongoose-pagination')

// Cargamos los modelos Artista, Album y Cancion

var Artista = require('../models/Artista');
var Album = require('../models/Album');
var cancion = require('../models/Cancion');


// Función para guardar un Artista: Se debe pasar por el cuerpo de la peticion los datos del artista

function GuardarArtista(req, res){
    var artista = new Artista();

var params = req.body;

artista.id = params.id;
artista.nombre = params.nombre;
artista.descripcion = params.descripcion;
artista.imagen = 'null';

// Guardar artista
artista.save((err, artistaStored) => {

    if (err){
    res.status(500).send({message: 'Error al guardar el artista'});
    }else{
        if(!artistaStored){
    res.status(404).send({message: 'el artista no ha sido guardado'});
        }else{

    res.status(200).send({artista: artistaStored});

        }
    }

});

}

// Función para obtener un artista: Requiere ID

function ObtenerArtista (req, res){

var artistaId = req.params.id;

Artista.findById(artistaId, (err, artista) => {
if(err){
    res.status(500).send({message: 'Error en la peticion'});
}else{
    if(!artista){
    res.status(404).send({message: 'El artista no existe'});
    }else{
    res.status(200).send({artista});
    }
}

});

}

// Función para obtener varios artistas: Es opcional pasar la pagina 

function ObtenerArtistas (req, res){
if(req.params.page) {
  
    var page = req.params.page;
}else{
    var page = 1;
}


    var page = req.params.page;
    var itemsPerPage = 4;

    Artista.find().sort('nombre').paginate(page,itemsPerPage, function(err, artistas, total){
if(err){
    res.status(500).send({message: 'Error en la peticion'});
}else{
if(!artistas){
    res.status(404).send({message: 'No hay artistas'});
}else{
  return  res.status(200).send({ total_items: total, artistas: artistas});
}
}
  
    });
}

// Función para actualizar un artista: Se deben pasar los datos del artista por el cuerpo de la peticion y por parametro el ID del artista

function ActualizarArtista (req,res){
var artistaId = req.params.id;
var actualizar = req.body;

Artista.findByIdAndUpdate(artistaId , actualizar, (error, artistaActualizado) => {
if(error){
    res.status(500).send({message: 'Error al guardar el artista'});
}else{
    if(!artistaActualizado){
        res.status(404).send({message: 'Artista no a sido actualizado'});
    }else{
    res.status(200).send({artista: artistaActualizado});

    }
}

});

}

// Función para borrar un artista: Se debe especificar el ID del Artista (Si se elimina un artista tambien se borran las canciones y los albums que contenga)

function EliminarArtista (req, res){

var artistaId = req.params.id;

// Eliminar artista 

Artista.findByIdAndRemove(artistaId, (err, artistaRemoved) => {

if(err){
    res.status(500).send({message: 'Error al eliminar el artista'});

}else{
if(!artistaRemoved){
    res.status(404).send({message: 'El artista no ha sido eliminado'});
}else{
    
// Eliminar albúm

Album.find({artistas: artistaRemoved._id}).remove((err,albumRemoved) => {

    if(err){
        res.status(500).send({message: 'Error al eliminar el album'});
    
    }else{
    if(!albumRemoved){
        res.status(404).send({message: 'El album no ha sido eliminado'});
    }else{


 // elimicar Cancion 

        cancion.find({album: albumRemoved._id}).remove((err,cancionRemoved) => {

            if(err){
                res.status(500).send({message: 'Error al eliminar la cancion'});
            
            }else{
            if(! cancionRemoved){
                res.status(404).send({message: ' La cancion no ha sido eliminada '});
             }else{
    
                res.status(200).send({artista: artistaRemoved});

               }

             }
           });
         }}
         });
      };

     }
     });
};

// Función para subir una imagen: Se debe enviar en el contenido del cuerpo de la peticion un archivo denominado files y de tipo file

function SubirImagen(req, res){

    var artistaId = req.params.id;
	var file_name = 'No subido...';

	if(req.files){
		var file_path = req.files.imagen.path;
		var file_split = file_path.split('\/');
		var file_name = file_split[2];

		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];
		
 if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){

			Artista.findByIdAndUpdate(artistaId, {imagen: file_name}, (error, artistaActualizado) => {
				if(!artistaId){
					res.status(404).send({message: 'No se ha podido actualizar el Artista'});
				}else{
					res.status(200).send({ artista: artistaActualizado });
				}
			});

		}else{
			res.status(200).send({message: 'Extensión del archivo no valida'});
		}
		
	}else{
		res.status(200).send({message: 'No has subido ninguna imagen...'});
	}
}

// Función creada para mostrar una imagen: Se debe pasar por parametro el ID del artista(De esta forma se protegen los recursos)

function ObtenerImagen(req, res){

        var imageFile = req.params.imageFile;
        var path_file = './uploads/artistas/'+imageFile;
          fs.exists(path_file, function(exists){
              if(exists){
                  res.sendFile(path.resolve(path_file));
              }else{
                  res.status(200).send({message: 'No existe la imagen...'});
              }
          });
      }


module.exports = {
    ObtenerArtista  , GuardarArtista, ObtenerArtistas , ActualizarArtista ,
     EliminarArtista, SubirImagen, ObtenerImagen
};

