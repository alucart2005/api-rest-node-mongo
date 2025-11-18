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
