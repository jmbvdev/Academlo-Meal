const express = require("express");

const router = express.Router();

//Controllers
const {login,createUser,updateUser,deleteUser,getAllOrders,getOrderById}=require("../controllers/users.controllers")

//Crear usuario
router.post("/signup", createUser);

//Iniciar sesión
router.post("/login" , login);

//Actualizar perfil de usuario
router.patch("/:id", updateUser);

//Deshabilitar cuenta de usuario
router.delete("/:id", deleteUser);

//Obtener todas las ordenes hechas por el usuario
router.get("/orders", getAllOrders);

//Obtener todas las ordenes hechas por el usuario dado un Id
router.get("/orders/:id", getOrderById);


module.exports = { usersRouter: router };
