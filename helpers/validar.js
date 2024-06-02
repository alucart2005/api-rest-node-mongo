const validator = require("validator"); // Importar la biblioteca validator para validación de datos
const { Error } = require("mongoose"); // Importar la clase Error de Mongoose

const validarArticulo = (parametros) => {
  // Validate title and content
  const isValidTitle =
    !validator.isEmpty(parametros.titulo) &&
    validator.isLength(parametros.titulo, { min: 5, max: 25 });
  const isValidContent = !validator.isEmpty(parametros.contenido);

  if (!isValidTitle || !isValidContent) {
    throw new Error(
      "Información no válida. Revise los campos título y contenido."
    );
  }
};

module.exports={
  validarArticulo
}