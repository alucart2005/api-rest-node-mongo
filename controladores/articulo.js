const fs = require("fs");
const { Error } = require("mongoose"); // Importar la clase Error de Mongoose
const Articulo = require("../modelos/Articulo"); // Importar el modelo de Artículo
const { validarArticulo } = require("../helpers/validar");
const { error } = require("console");
/**
 * Controlador para la acción de prueba
 *
 * @param {Object} req Objeto de solicitud HTTP
 * @param {Object} res Objeto de respuesta HTTP
 */
const prueba = (req, res) => {
  return res.status(200).json({
    mensaje: "Soy una accion de prueba en mi controlador de articulos",
  });
};

/**
 * Controlador para el endpoint CURSO
 *
 * @param {Object} req Objeto de solicitud HTTP
 * @param {Object} res Objeto de respuesta HTTP
 */
const curso = (req, res) => {
  console.log("Se ha ejecutado el endpoint CURSO");
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

/**
 * Controlador para crear un nuevo artículo
 *
 * @param {Object} req Objeto de solicitud HTTP
 * @param {Object} res Objeto de respuesta HTTP
 */

const crear = async (req, res) => {
  // Recoger los parámetros por post a guardar
  let parametros = req.body;
  const articulo = new Articulo(parametros);
  // Validar datos
  try {
    validarArticulo(parametros);
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "Faltan datos por enviar", //error.message, // Use the error message from the exception
    });
  }
  try {
    const articuloGuardado = await articulo.save();
    return res.status(200).json({
      status: "success",
      mensaje: "Articulo creado con exito",
      articulo: articuloGuardado,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      mensaje: "Error al guardar el artículo",
    });
  }
};

const listar = async (req, res) => {
  /**
   * Obtiene una lista de todos los artículos de la base de datos.
   *
   * @param {object} req - Objeto de solicitud HTTP.
   * @param {object} res - Objeto de respuesta HTTP.
   * @returns {Promise<void>}
   */
  try {
    // Busca todos los artículos en la colección "Articulo"
    let articulos = Articulo.find({});
    if (req.params.ultimos) {
      articulos = articulos.limit(3);
    }
    articulos = await articulos.sort({ fecha: -1 });

    // Verifica si se encontraron artículos
    if (!articulos) {
      // Si no se encontraron artículos, se envía una respuesta de error 404
      res.status(404).json({
        status: "error",
        mensaje: "No se han encontrado artículos !!",
      });
      return;
    }

    // Si se encontraron artículos, se envía una respuesta de éxito con los artículos
    res.status(200).json({
      status: "success",
      parametro: req.params.ultimos,
      contador: articulos.length,
      articulos,
    });
  } catch (error) {
    // Captura cualquier error que ocurra durante la ejecución del código
    console.error(error);
    res.status(500).json({
      status: "error",
      mensaje: "Error al obtener artículos",
    });
  }
};

const uno = async (req, res) => {
  try {
    // Retrieve the ID from the URL parameters
    const id = req.params.id;
    // Find the article using async/await
    const articulo = await Articulo.findById(id);
    // Check if the article exists
    if (!articulo) {
      throw new Error("No se ha encontrado el artículo");
    }
    // Send a success response with the article
    res.status(200).json({
      status: "success",
      articulo,
    });
  } catch (error) {
    // Handle errors and send an error response
    console.error(error);
    res.status(404).json({
      status: "error",
      mensaje: "No se ha encontrado el artículo",
    });
  }
};

const borrar = async (req, res) => {
  try {
    const articulo_id = req.params.id;
    const articulo = await Articulo.findOneAndDelete({ _id: articulo_id });
    if (!articulo) {
      throw new Error("No se ha encontrado el artículo a borrar");
    }
    res.status(200).json({
      status: "success",
      mensaje: "Articulo borrado",
      articulo: articulo,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      mensaje: "No se ha encontrado el artículo a borrar",
    });
  }
};

const editar = async (req, res) => {
  const articuloId = req.params.id;
  const parametros = req.body;

  try {
    // Update the article
    const updatedArticle = await Articulo.findOneAndUpdate(
      { _id: articuloId },
      parametros,
      { new: true } // Return the updated document
    );
    try {
      validarArticulo(parametros);
    } catch (error) {
      return res.status(400).json({
        status: "error",
        mensaje: "Faltan datos por enviar", //error.message, // Use the error message from the exception
      });
    }

    if (!updatedArticle) {
      return res.status(404).json({
        status: "error",
        mensaje: "No se encontró el artículo para editar.",
      });
    }

    return res.status(200).json({
      status: "success",
      mensaje: "Artículo modificado con éxito.",
      articulo: updatedArticle,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      mensaje: "No existe el articulo a editar",
    });
  }
};

const subir = async (req, res) => {
  // Configurar Muter
  // Recoger el fichero de imagen subida
  if (!req.file && !req.files) {
    return res.status(404).json({
      status: "error",
      mensaje: "Peticion invalida",
    });
  }
  // Nombre del archivo
  let archivo = req.file.originalname;
  // Conseguier el nombre del archivo
  let archivo_split = archivo.split(".");
  // Conseguier la extension del archivo
  let extension = archivo_split[1];
  // Comprobar la extension correcta
  if (
    extension != "png" &&
    extension != "jpg" &&
    extension != "jpeg" &&
    extension != "gif"
  ) {
    fs.unlink(req.file.path, (error) => {
      return res.status(400).json({
        status: "error",
        mensaje: "Imagen invalida",
      });
    });
  } else {
    return res.status(200).json({
      status: "success",
      archivo_split,
      files: req.file,
    });
  }

  // si todo va bien actualizar el articulo

  // Devolver respuesta
};

module.exports = {
  prueba,
  curso,
  crear,
  listar,
  uno,
  borrar,
  editar,
  subir,
};
