const express = require('express');

const router = express.Router();

//Controllers
const {
  createOrder,
  deleteOrder,
  updateOrder,
  getOrders,
} = require('../controllers/orders.controllers');
const { validateToken } = require('../middlewares/jsonwebtoken.middleware');

//Crear orden
router.post('/', validateToken, createOrder);

//Obtener las ordenes del usuario
router.get('/me', validateToken, getOrders);

//Actualizar orden
router.patch('/:id', validateToken, updateOrder);

//Eliminar orden
router.delete('/:id', validateToken, deleteOrder);

module.exports = { ordersRouter: router };
