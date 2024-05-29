const { conexion } = require("./basedatos/conexion");
const express = require("express");
const cors = require("cors");

// Inicializar app
console.log("Node application started");

// Conectar base de datos
conexion();

// Crear servidor Node
const app = express();
const puerto = 3900;
// Invocar middleware
// Configurar cors
app.use(cors());

//Leer y convertir el body a objeto js
app.use(express.json());

// Crear rutas

// Crear servidor y escuchar peticiones
app.listen(puerto,()=>{
  console.log("Server running on port "+puerto)
});
