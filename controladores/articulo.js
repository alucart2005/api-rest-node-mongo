const prueba = (res, req) => {
  return res.status(200).json({
    mensaje: "Soy una accion de prueba en mi controlador de articulos",
  });
};

module.exports = {
  prueba,
};
