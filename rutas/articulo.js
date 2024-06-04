const express = require("express");
const multer = require("multer");
const router = express.Router();

const ArticuloControlador = require("../controladores/articulo");

const almacenamiento = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./imagenes/articulos/");
  },
  filename: (req, file, cb) => {
    cb(null, "/articulo" + Date.now() + file.originalname);
  },
});

const subidas = multer({ storage: almacenamiento });

// Ruta de prueba
router.get("/ruta-de-prueba", ArticuloControlador.prueba); // nombre url, metodo a cargar
router.get("/curso", ArticuloControlador.curso);

// Ruta util
router.post("/crear", ArticuloControlador.crear); // POST para guardar un recurso
router.get("/articulos/:ultimos?", ArticuloControlador.listar);
router.get("/articulo/:id", ArticuloControlador.uno);
router.put("/articulo/:id", ArticuloControlador.editar);
router.post("/subir-imagen/:id", [subidas.single("file0")], ArticuloControlador.subir);

module.exports = router;
