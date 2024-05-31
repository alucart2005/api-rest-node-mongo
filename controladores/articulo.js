const prueba = (req, res) => {
  return res.status(200).json({
    mensaje: "Soy una accion de prueba en mi controlador de articulos",
  });
};

const curso = (req, res) => {
  console.log("Se ha ejecutado el enpoint CURSO");
  return res.status(200).json([
    {
      autor: "Napoleon",
      country: "Colombia",
      url: "codewizardai.com",
    },
    {
      autor: "Napoleon",
      country: "Colombia",
      url: "codewizardai.com",
    },
  ]);
};

module.exports = {
  prueba,
  curso,
};
