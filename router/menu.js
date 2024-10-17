const express = require ("express");

const MenuController = require("../controllers/menu");

// la creacion, actualizacion y eliminacion de nuestro menu solo lo podrán hacer los usuarios autenticados
// pero el get para obtener el menu sera para cualquiera, cualquier usuario puede ver el menu.

const md_auth = require("../middlewares/authenticated");

const api = express.Router();

//ENDPOINT --> todo lo que tenga [md_auth.asureAuth] significa que el usuario debe estar autenticado para realizarlo.
api.post("/menu", [md_auth.asureAuth], MenuController.createMenu); // solo para usuarios autenticados.
api.get("/menu", MenuController.getMenus);
api.patch("/menu/:id", [md_auth.asureAuth], MenuController.updateMenu);
api.delete("/menu/:id", [md_auth.asureAuth], MenuController.deleteMenu);
// ...

module.exports = api;