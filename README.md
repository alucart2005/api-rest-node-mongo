<div align="center">

# REST API with Node.js and MongoDB

**Language / Idioma:** [🇺🇸 English](#english) | [🇪🇸 Español](#español)

</div>

---

<a name="english"></a>

<div id="english">

# REST API with Node.js and MongoDB

A robust RESTful API built with Node.js, Express.js, and MongoDB for managing articles (blog posts) with full CRUD operations, image upload capabilities, and search functionality.

## 🚀 Features

- **Full CRUD Operations**: Create, Read, Update operations for articles
- **Image Upload**: Support for image uploads with validation (PNG, JPG, JPEG, GIF)
- **Search Functionality**: Search articles by title or content
- **Data Validation**: Input validation for articles (title length: 5-25 characters)
- **CORS Enabled**: Cross-Origin Resource Sharing support
- **MongoDB Integration**: Database connection using Mongoose ODM
- **File Management**: Automatic file naming and storage for uploaded images

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **MongoDB** (v4.0 or higher)
- **npm** (Node Package Manager)

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js 4.19.2
- **Database**: MongoDB
- **ODM**: Mongoose 8.4.0
- **File Upload**: Multer 1.4.5
- **Validation**: Validator 13.12.0
- **CORS**: cors 2.8.5

## 📦 Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd api-rest-node-mongo
```

2. Install dependencies:

```bash
npm install
```

3. Make sure MongoDB is running on your local machine:

```bash
# MongoDB should be running on default port 27017
mongod
```

4. Start the server:

```bash
npm start
```

The API will be available at `http://localhost:3900`

## ⚙️ Configuration

### Database Configuration

The database connection is configured in `basedatos/conexion.js`. By default, it connects to:

- **Database Name**: `mi_blog`
- **Host**: `localhost`
- **Port**: `27017`

To change the database configuration, modify the connection string in `basedatos/conexion.js`:

```javascript
await mongoose.connect("mongodb://localhost:27017/mi_blog");
```

### Server Port

The default server port is `3900`. To change it, modify the `puerto` variable in `index.js`:

```javascript
const puerto = 3900;
```

## 📚 API Endpoints

### Test Endpoints

#### `GET /probando`

Returns a test response with sample data.

**Response:**

```json
[
  {
    "autor": "Napoleon",
    "country": "Colombia",
    "url": "codewizardai.com"
  }
]
```

#### `GET /api/ruta-de-prueba`

Test endpoint for articles controller.

**Response:**

```json
{
  "mensaje": "Soy una accion de prueba en mi controlador de articulos"
}
```

#### `GET /api/curso`

Returns sample course data.

### Article Endpoints

#### `POST /api/crear`

Create a new article.

**Request Body:**

```json
{
  "titulo": "Article Title",
  "contenido": "Article content goes here"
}
```

**Validation Rules:**

- `titulo`: Required, 5-25 characters
- `contenido`: Required, non-empty

**Response:**

```json
{
  "status": "success",
  "mensaje": "Articulo creado con exito",
  "articulo": {
    "_id": "...",
    "titulo": "Article Title",
    "contenido": "Article content goes here",
    "fecha": "2024-01-01T00:00:00.000Z",
    "imagen": "default.png"
  }
}
```

#### `GET /api/articulos`

Get all articles, sorted by date (newest first).

**Response:**

```json
{
  "status": "success",
  "parametro": null,
  "contador": 10,
  "articulos": [...]
}
```

#### `GET /api/articulos/ultimos`

Get the last 3 articles.

**Response:**

```json
{
  "status": "success",
  "parametro": "ultimos",
  "contador": 3,
  "articulos": [...]
}
```

#### `GET /api/articulo/:id`

Get a specific article by ID.

**Parameters:**

- `id`: Article MongoDB `_id`

**Response:**

```json
{
  "status": "success",
  "articulo": {
    "_id": "...",
    "titulo": "Article Title",
    "contenido": "Article content",
    "fecha": "2024-01-01T00:00:00.000Z",
    "imagen": "article-image.png"
  }
}
```

#### `PUT /api/articulo/:id`

Update an existing article.

**Parameters:**

- `id`: Article MongoDB `_id`

**Request Body:**

```json
{
  "titulo": "Updated Title",
  "contenido": "Updated content"
}
```

**Response:**

```json
{
  "status": "success",
  "mensaje": "Artículo modificado con éxito.",
  "articulo": {...}
}
```

#### `POST /api/subir-imagen/:id`

Upload an image for an article.

**Parameters:**

- `id`: Article MongoDB `_id`

**Request:**

- Content-Type: `multipart/form-data`
- Field name: `file0`
- Accepted formats: PNG, JPG, JPEG, GIF

**Response:**

```json
{
  "status": "success",
  "mensaje": "Artículo modificado con éxito.",
  "articulo": {...},
  "fichero": {...}
}
```

#### `GET /api/imagen/:fichero`

Get an article image file.

**Parameters:**

- `fichero`: Image filename

**Response:**

- Image file (PNG, JPG, JPEG, GIF)

#### `GET /api/buscar/:busqueda`

Search articles by title or content.

**Parameters:**

- `busqueda`: Search query (case-insensitive)

**Response:**

```json
{
  "status": "success",
  "articulos": [...]
}
```

## 📁 Project Structure

```
api-rest-node-mongo/
├── basedatos/
│   └── conexion.js          # MongoDB connection configuration
├── controladores/
│   └── articulo.js          # Article controller (business logic)
├── helpers/
│   └── validar.js           # Validation helpers
├── imagenes/
│   └── articulos/           # Uploaded article images
├── modelos/
│   └── Articulo.js          # Article Mongoose schema
├── rutas/
│   └── articulo.js          # Article routes
├── index.js                 # Application entry point
├── package.json             # Project dependencies and scripts
└── README.md               # Project documentation
```

## 📖 Data Model

### Article Schema

```javascript
{
  titulo: String,      // Required, 5-25 characters
  contenido: String,   // Required
  fecha: Date,         // Default: Date.now
  imagen: String       // Default: "default.png"
}
```

## 🧪 Usage Examples

### Create an Article

```bash
curl -X POST http://localhost:3900/api/crear \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "My First Article",
    "contenido": "This is the content of my first article."
  }'
```

### Get All Articles

```bash
curl http://localhost:3900/api/articulos
```

### Get Last 3 Articles

```bash
curl http://localhost:3900/api/articulos/ultimos
```

### Search Articles

```bash
curl http://localhost:3900/api/buscar/nodejs
```

### Upload Image

```bash
curl -X POST http://localhost:3900/api/subir-imagen/ARTICLE_ID \
  -F "file0=@/path/to/image.png"
```

## 🐛 Error Handling

The API returns appropriate HTTP status codes:

- `200`: Success
- `400`: Bad Request (validation errors)
- `404`: Not Found (article not found)
- `500`: Internal Server Error

Error responses follow this format:

```json
{
  "status": "error",
  "mensaje": "Error message description"
}
```

## 🔒 Security Considerations

- Input validation is performed on all article creation and updates
- File upload validation ensures only image files are accepted
- CORS is enabled for cross-origin requests (configure appropriately for production)

## 📝 License

This project is licensed under the MIT License.

## 👤 Author

**Napoleon Anaya**

- Website: codewizardai.com
- Country: Colombia

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📞 Support

For support, please open an issue in the repository or contact the author.

---

Made with ❤️ using Node.js and MongoDB

</div>

---

<a name="español"></a>

<div id="español">

# API REST con Node.js y MongoDB

Una API RESTful robusta construida con Node.js, Express.js y MongoDB para gestionar artículos (publicaciones de blog) con operaciones CRUD completas, capacidades de carga de imágenes y funcionalidad de búsqueda.

## 🚀 Características

- **Operaciones CRUD Completas**: Crear, Leer, Actualizar operaciones para artículos
- **Carga de Imágenes**: Soporte para carga de imágenes con validación (PNG, JPG, JPEG, GIF)
- **Funcionalidad de Búsqueda**: Buscar artículos por título o contenido
- **Validación de Datos**: Validación de entrada para artículos (longitud del título: 5-25 caracteres)
- **CORS Habilitado**: Soporte para intercambio de recursos de origen cruzado
- **Integración con MongoDB**: Conexión a base de datos usando Mongoose ODM
- **Gestión de Archivos**: Nombrado automático de archivos y almacenamiento para imágenes subidas

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- **Node.js** (v14 o superior)
- **MongoDB** (v4.0 o superior)
- **npm** (Node Package Manager)

## 🛠️ Stack Tecnológico

- **Runtime**: Node.js
- **Framework**: Express.js 4.19.2
- **Base de Datos**: MongoDB
- **ODM**: Mongoose 8.4.0
- **Carga de Archivos**: Multer 1.4.5
- **Validación**: Validator 13.12.0
- **CORS**: cors 2.8.5

## 📦 Instalación

1. Clona el repositorio:

```bash
git clone <repository-url>
cd api-rest-node-mongo
```

2. Instala las dependencias:

```bash
npm install
```

3. Asegúrate de que MongoDB esté ejecutándose en tu máquina local:

```bash
# MongoDB debe estar ejecutándose en el puerto por defecto 27017
mongod
```

4. Inicia el servidor:

```bash
npm start
```

La API estará disponible en `http://localhost:3900`

## ⚙️ Configuración

### Configuración de Base de Datos

La conexión a la base de datos está configurada en `basedatos/conexion.js`. Por defecto, se conecta a:

- **Nombre de Base de Datos**: `mi_blog`
- **Host**: `localhost`
- **Puerto**: `27017`

Para cambiar la configuración de la base de datos, modifica la cadena de conexión en `basedatos/conexion.js`:

```javascript
await mongoose.connect("mongodb://localhost:27017/mi_blog");
```

### Puerto del Servidor

El puerto predeterminado del servidor es `3900`. Para cambiarlo, modifica la variable `puerto` en `index.js`:

```javascript
const puerto = 3900;
```

## 📚 Endpoints de la API

### Endpoints de Prueba

#### `GET /probando`

Devuelve una respuesta de prueba con datos de muestra.

**Respuesta:**

```json
[
  {
    "autor": "Napoleon",
    "country": "Colombia",
    "url": "codewizardai.com"
  }
]
```

#### `GET /api/ruta-de-prueba`

Endpoint de prueba para el controlador de artículos.

**Respuesta:**

```json
{
  "mensaje": "Soy una accion de prueba en mi controlador de articulos"
}
```

#### `GET /api/curso`

Devuelve datos de muestra del curso.

### Endpoints de Artículos

#### `POST /api/crear`

Crear un nuevo artículo.

**Cuerpo de la Solicitud:**

```json
{
  "titulo": "Título del Artículo",
  "contenido": "Aquí va el contenido del artículo"
}
```

**Reglas de Validación:**

- `titulo`: Requerido, 5-25 caracteres
- `contenido`: Requerido, no vacío

**Respuesta:**

```json
{
  "status": "success",
  "mensaje": "Articulo creado con exito",
  "articulo": {
    "_id": "...",
    "titulo": "Título del Artículo",
    "contenido": "Aquí va el contenido del artículo",
    "fecha": "2024-01-01T00:00:00.000Z",
    "imagen": "default.png"
  }
}
```

#### `GET /api/articulos`

Obtener todos los artículos, ordenados por fecha (más recientes primero).

**Respuesta:**

```json
{
  "status": "success",
  "parametro": null,
  "contador": 10,
  "articulos": [...]
}
```

#### `GET /api/articulos/ultimos`

Obtener los últimos 3 artículos.

**Respuesta:**

```json
{
  "status": "success",
  "parametro": "ultimos",
  "contador": 3,
  "articulos": [...]
}
```

#### `GET /api/articulo/:id`

Obtener un artículo específico por ID.

**Parámetros:**

- `id`: MongoDB `_id` del artículo

**Respuesta:**

```json
{
  "status": "success",
  "articulo": {
    "_id": "...",
    "titulo": "Título del Artículo",
    "contenido": "Contenido del artículo",
    "fecha": "2024-01-01T00:00:00.000Z",
    "imagen": "imagen-articulo.png"
  }
}
```

#### `PUT /api/articulo/:id`

Actualizar un artículo existente.

**Parámetros:**

- `id`: MongoDB `_id` del artículo

**Cuerpo de la Solicitud:**

```json
{
  "titulo": "Título Actualizado",
  "contenido": "Contenido actualizado"
}
```

**Respuesta:**

```json
{
  "status": "success",
  "mensaje": "Artículo modificado con éxito.",
  "articulo": {...}
}
```

#### `POST /api/subir-imagen/:id`

Subir una imagen para un artículo.

**Parámetros:**

- `id`: MongoDB `_id` del artículo

**Solicitud:**

- Content-Type: `multipart/form-data`
- Nombre del campo: `file0`
- Formatos aceptados: PNG, JPG, JPEG, GIF

**Respuesta:**

```json
{
  "status": "success",
  "mensaje": "Artículo modificado con éxito.",
  "articulo": {...},
  "fichero": {...}
}
```

#### `GET /api/imagen/:fichero`

Obtener un archivo de imagen de artículo.

**Parámetros:**

- `fichero`: Nombre del archivo de imagen

**Respuesta:**

- Archivo de imagen (PNG, JPG, JPEG, GIF)

#### `GET /api/buscar/:busqueda`

Buscar artículos por título o contenido.

**Parámetros:**

- `busqueda`: Consulta de búsqueda (sin distinción entre mayúsculas y minúsculas)

**Respuesta:**

```json
{
  "status": "success",
  "articulos": [...]
}
```

## 📁 Estructura del Proyecto

```
api-rest-node-mongo/
├── basedatos/
│   └── conexion.js          # Configuración de conexión a MongoDB
├── controladores/
│   └── articulo.js          # Controlador de artículos (lógica de negocio)
├── helpers/
│   └── validar.js           # Ayudantes de validación
├── imagenes/
│   └── articulos/           # Imágenes de artículos subidas
├── modelos/
│   └── Articulo.js          # Esquema Mongoose de Artículo
├── rutas/
│   └── articulo.js          # Rutas de artículos
├── index.js                 # Punto de entrada de la aplicación
├── package.json             # Dependencias y scripts del proyecto
└── README.md               # Documentación del proyecto
```

## 📖 Modelo de Datos

### Esquema de Artículo

```javascript
{
  titulo: String,      // Requerido, 5-25 caracteres
  contenido: String,   // Requerido
  fecha: Date,         // Por defecto: Date.now
  imagen: String       // Por defecto: "default.png"
}
```

## 🧪 Ejemplos de Uso

### Crear un Artículo

```bash
curl -X POST http://localhost:3900/api/crear \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Mi Primer Artículo",
    "contenido": "Este es el contenido de mi primer artículo."
  }'
```

### Obtener Todos los Artículos

```bash
curl http://localhost:3900/api/articulos
```

### Obtener los Últimos 3 Artículos

```bash
curl http://localhost:3900/api/articulos/ultimos
```

### Buscar Artículos

```bash
curl http://localhost:3900/api/buscar/nodejs
```

### Subir Imagen

```bash
curl -X POST http://localhost:3900/api/subir-imagen/ID_ARTICULO \
  -F "file0=@/ruta/a/imagen.png"
```

## 🐛 Manejo de Errores

La API devuelve códigos de estado HTTP apropiados:

- `200`: Éxito
- `400`: Solicitud Incorrecta (errores de validación)
- `404`: No Encontrado (artículo no encontrado)
- `500`: Error Interno del Servidor

Las respuestas de error siguen este formato:

```json
{
  "status": "error",
  "mensaje": "Descripción del mensaje de error"
}
```

## 🔒 Consideraciones de Seguridad

- Se realiza validación de entrada en todas las creaciones y actualizaciones de artículos
- La validación de carga de archivos asegura que solo se acepten archivos de imagen
- CORS está habilitado para solicitudes de origen cruzado (configurar apropiadamente para producción)

## 📝 Licencia

Este proyecto está licenciado bajo la Licencia MIT.

## 👤 Autor

**Napoleon Anaya**

- Sitio web: codewizardai.com
- País: Colombia

## 🤝 Contribuciones

¡Las contribuciones, problemas y solicitudes de características son bienvenidas! Siéntete libre de revisar la página de problemas.

## 📞 Soporte

Para obtener soporte, por favor abre un issue en el repositorio o contacta al autor.

---

Hecho con ❤️ usando Node.js y MongoDB

</div>

---

<div align="center">

**[⬆ Volver arriba](#rest-api-with-nodejs-and-mongodb)**

</div>
