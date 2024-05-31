const express = require("express");
const router = express.Router();

const ArticuloControlador = require("../controladores/articulo");

// Ruta de prueba

router.get("/ruta-de-prueba", ArticuloControlador.prueba); // nombre url, metodo a cargar

router.get("/curso", ArticuloControlador.curso);

module.exports = router;
