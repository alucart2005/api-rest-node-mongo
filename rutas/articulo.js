const express = require("express");
const router = express.Router();

const ArticuloControlador = require("../controladores/articulo");

// Ruta de prueba

router.get("/ruta-e-prueba", ArticuloControlador.prueba);

module.exports = router;
