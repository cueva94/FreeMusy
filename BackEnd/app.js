'use strict'


var express = require('express');
var bodyParse = require ('body-parser');

var app = express();

 // cargar routes 

 var Usuario_routes = require('./routes/Usuario');
 var Artista_routes = require('./routes/Artista');
 var Album_routes = require('./routes/Album');
 var Cancion_routes = require('./routes/Cancion');


 app.use(bodyParse.urlencoded({extended:false}));
 app.use(bodyParse.json());
 
// Configurar cabeceras y cors

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers',
    'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


 // rutas base
 
 app.use('/api', Usuario_routes);
 app.use('/api', Artista_routes);
 app.use('/api', Album_routes);
 app.use('/api', Cancion_routes);


 


 module.exports = app;
  