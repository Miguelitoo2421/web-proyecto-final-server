const express = require("express");
const AuthController = require("../controllers/auth");


//RUTAS:
const api = express.Router();

api.post("/auth/register", AuthController.register);

module.exports = api;