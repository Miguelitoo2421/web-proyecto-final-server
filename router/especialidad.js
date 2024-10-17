const express = require ("express");
const multiparty = require("connect-multiparty");
const EspecialidadController = require("../controllers/especialidad");
// solo usuarios autenticados podran crear, actualizar y eliminar especialidades, el resto de usuarios solo get.
const md_auth = require("../middlewares/authenticated");

const md_upload = multiparty({uploadDir: "./uploads/especialidad"});
const api = express.Router();

// AQUI VAN LAS RUTAS -- APIS

//primera ruta creación de la especialidad:
api.post("/especialidad", [md_auth.asureAuth, md_upload], EspecialidadController.createEspecialidad);
api.get("/especialidad", EspecialidadController.getEspecialidad);
api.patch("/especialidad/:id", [md_auth.asureAuth, md_upload],  EspecialidadController.updateEspecialidad);
api.delete("/especialidad/:id", [md_auth.asureAuth], EspecialidadController.deleteEspecialidad);

module.exports = api;

