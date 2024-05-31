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

// RUTAS



// Rutas de pruebas hardcodeadas
app.get("/probando", (req, res) => {
  console.log("Se ha ejecutado el enpoint probando");
  return res.status(200).json([{
    autor: "Napoleon",
    country: "Colombia",
    url: "codewizardai.com",
  },
  {
    autor: "Napoleon",
    country: "Colombia",
    url: "codewizardai.com",
  }]);
});

app.get("/", (req, res) => {
  return res.status(200).send(`
  <h1>Empezando a crear una api rest con node</h1>
  `);
});

// Crear servidor y escuchar peticiones
app.listen(puerto, () => {
  console.log("Server running on port " + puerto);
});
