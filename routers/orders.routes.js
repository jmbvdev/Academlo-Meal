const express = require("express");

const router = express.Router();

//Controllers
const {createOrder,deleteOrder,updateOrder,getOrders}=require("../controllers/orders.controllers")

//Crear orden
router.post("/", createOrder);

//Obtener las ordenes del usuario
router.get("/me" , getOrders);

//Actualizar orden
router.patch("/:id", updateOrder);

//Eliminar orden
router.delete("/:id", deleteOrder);





module.exports = { ordersRouter: router };
