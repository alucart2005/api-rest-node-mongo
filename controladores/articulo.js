const { Error } = require("mongoose"); // Importar la clase Error de Mongoose
const Articulo = require("../modelos/Articulo"); // Importar el modelo de Artículo
const validator = require("validator"); // Importar la biblioteca validator para validación de datos

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
    let validar_titulo =
      !validator.isEmpty(parametros.titulo) &&
      validator.isLength(parametros.titulo, { min: 5, max: 25 });
    let validar_contenido = !validator.isEmpty(parametros.contenido);

    if (!validar_contenido || !validar_titulo) {
      throw new Error("No se ha validado la informacion !!");
    }
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "Faltan datos por enviar",
    });
  }
  // Crear el objeto a guardar
  // Asignar valores a objetos basado en el modelo (manual o automatico)
  // articulo.titulo = parametros.titulo
  // Guardar el artículo en la base de datos
  try {
    const articuloGuardado = await articulo.save();
    return res.status(200).json({
      status: "success",
      articulo: articuloGuardado,
      mensaje: "Articulo creado con exito",
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

/* VER 1.0
const editar = async (req, res) => {
  let articuloId = req.params.id;
  let parametros = req.body;

  try {
    let validar_titulo =
      !validator.isEmpty(parametros.titulo) &&
      validator.isLength(parametros.titulo, { min: 5, max: 25 });
    let validar_contenido = !validator.isEmpty(parametros.contenido);

    if (!validar_contenido || !validar_titulo) {
      throw new Error("No se ha validado la informacion !!");
    }
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "Faltan datos por enviar",
    });
  }

  try {
    const articulo = await Articulo.findOneAndUpdate(
      { _id: articuloId },
      req.body,
      {new:true},

    );
    return res.status(200).json({
      status: "success",
      mensaje: "Articulo modificado con exito",
      articulo: articulo,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      mensaje: "Error al editar el artículo",
    });
  }
};
*/

/* VERSION 2.0
const editar = async (req, res) => {
  const articuloId = req.params.id;
  const parametros = req.body;

  try {
    // Validate title and content
    const isValidTitle = !validator.isEmpty(parametros.titulo) && validator.isLength(parametros.titulo, { min: 5, max: 25 });
    const isValidContent = !validator.isEmpty(parametros.contenido);

    if (!isValidTitle || !isValidContent) {
      throw new Error("Información no válida. Revise los campos título y contenido.");
    }
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: error.message, // Use the error message from the exception
    });
  }

  try {
    // Update the article
    const updatedArticle = await Articulo.findOneAndUpdate(
      { _id: articuloId },
      parametros,
      { new: true } // Return the updated document
    );

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
      mensaje: "Error al editar el artículo.",
    });
  }
};
*/

//VERSION 3
const editar = async (req, res) => {
  const articuloId = req.params.id;
  const parametros = req.body;

  
  validarArticulo(res, parametros);


  try {
    // Update the article
    const updatedArticle = await Articulo.findOneAndUpdate(
      { _id: articuloId },
      parametros,
      { new: true } // Return the updated document
    );

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
      mensaje: "Error al editar el artículo.",
    });
  }
};

const validarArticulo = (res, parametros) => {
  try {
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
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "No se ha validado la informacion", //error.message, // Use the error message from the exception
    });
  }
};

module.exports = {
  prueba,
  curso,
  crear,
  listar,
  uno,
  borrar,
  editar,
};
