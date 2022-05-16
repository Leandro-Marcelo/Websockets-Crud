// Con esto ya tengo una aplicación de servidor bastante basica
const express = require("express");
const app = express();

// En app tenemos nuestra aplicación de express, entonces express puede configurar que archivos puede servir al frontend
// Quiero que cuando comiences a funcionar, utilices un modulo que viene de express llamado static y static recibe el nombre de la carpeta que quiero servir. Se sirve automaticamente porque cuando un servidor esta vacio, lo primero que hace el navegador es buscar el index.html
app.use(express.static(__dirname + "/public"));

module.exports = app;
