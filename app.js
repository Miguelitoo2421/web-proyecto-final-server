const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const{API_VERSION} = require ("./constants");

const app = express();

// importamos aqui las rutas:
const authRoutes = require("./router/auth");
const userRoutes = require("./router/user");
const menuRoutes = require("./router/menu");
const especialidadRoutes = require("./router/especialidad");
const postRoutes = require("./router/post");
// ...


// configuracion del body parser:
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
// ...


//configuramos carpeta static:
app.use(express.static("uploads"));
// ...


// configuramos header http - cors:
app.use(cors());
// ...


// configuramos aqui las rutas:
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, menuRoutes);
app.use(`/api/${API_VERSION}`, especialidadRoutes);
app.use(`/api/${API_VERSION}`, postRoutes);

// ...

module.exports = app;