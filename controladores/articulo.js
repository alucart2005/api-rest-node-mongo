const { Error } = require('mongoose'); // Importar la clase Error de Mongoose
const Articulo = require('../modelos/Articulo'); // Importar el modelo de Artículo

const validator = require('validator'); // Importar la biblioteca validator para validación de datos

/**
 * Controlador para la acción de prueba
 *
 * @param {Object} req Objeto de solicitud HTTP
 * @param {Object} res Objeto de respuesta HTTP
 */
const prueba = (req, res) => {
  return res.status(200).json({
    mensaje: 'Soy una accion de prueba en mi controlador de articulos',
  });
};

/**
 * Controlador para el endpoint CURSO
 *
 * @param {Object} req Objeto de solicitud HTTP
 * @param {Object} res Objeto de respuesta HTTP
 */
const curso = (req, res) => {
  console.log('Se ha ejecutado el endpoint CURSO');
  return res.status(200).json([
    {
      autor: 'Napoleon',
      country: 'Colombia',
      url: 'codewizardai.com',
    },
    {
      autor: 'Napoleon',
      country: 'Colombia',
      url: 'codewizardai.com',
    },
  ]);
};

/**
 * Controlador para crear un nuevo artículo
 *
 * @param {Object} req Objeto de solicitud HTTP
 * @param {Object} res Objeto de respuesta HTTP
 */
const crear = async (req, res) => {
  // Recoger los parámetros por post a guardar
  let parametros = req.body;

  // Validar datos
  try {
    let validar_titulo =
      !validator.isEmpty(parametros.titulo) &&
      validator.isLength(parametros.titulo, { min: 5, max: 25 });
    let validar_contenido = !validator.isEmpty(parametros.contenido);

    if (!validar_contenido || !validar_titulo) {
      throw new Error('No se ha validado la informacion !!');
    }
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      mensaje: 'Faltan datos por enviar',
    });
  }

  // Crear el objeto a guardar
  const articulo = new Articulo(parametros);

  // Asignar valores a objetos basado en el modelo (manual o automatico)
  // articulo.titulo = parametros.titulo

  // Guardar el artículo en la base de datos
  try {
    const articuloGuardado = await articulo.save();
    return res.status(200).json({
      status: 'success',
      articulo: articuloGuardado,
      mensaje: 'Articulo creado con exito',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'error',
      mensaje: 'Error al guardar el artículo',
    });
  }
};

module.exports = {
  prueba,
  curso,
  crear,
};
