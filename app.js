const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const{API_VERSION} = require ("./constants");

const app = express();

// importamos aqui las rutas:
const authRoutes = require("./router/auth");
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
app.use(`/api/${API_VERSION}`,authRoutes);
// ...

module.exports = app;