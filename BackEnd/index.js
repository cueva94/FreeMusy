 'use strict'

 
 const app = require ('./app');
 const express = require ('express');
 const mongoose = require('mongoose'); 


//Puerto Base de Datos 
 
 const port = process.env.PORT || 9000;

// mongodb conexión
mongoose.connect('mongodb+srv://abmin:abmin@cluster0.os4zi44.mongodb.net/?retryWrites=true&w=majority' ,(err,res) => {
    
if (err){
    throw err;
}else{
    console.log('La conexión a la base de datos esta funcionando...');

    app.listen(port,function(){

        console.log('Servidor del api rest escuchando en http://localhost:'+port);
    })
}
});

