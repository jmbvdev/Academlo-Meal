const express = require('express');

const router = express.Router();

const { body } = require('express-validator');

//Controllers
const {
  login,
  createUser,
  updateUser,
  deleteUser,
  getAllOrders,
  getOrderById,
} = require('../controllers/users.controllers');
const {
  validateToken,
  protectAdmin,
} = require('../middlewares/jsonwebtoken.middleware');
const { checkValidations } = require('../middlewares/validations.middlewares');

//Crear usuario
router.post(
  '/signup',
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Invalid Email'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  checkValidations,
  createUser
);

//Iniciar sesión
router.post('/login', login);

//Actualizar perfil de usuario
router.patch('/:id', validateToken, protectAdmin, updateUser);

//Deshabilitar cuenta de usuario
router.delete('/:id', validateToken, protectAdmin, deleteUser);

//Obtener todas las ordenes hechas por el usuario
router.get('/orders', validateToken, getAllOrders);

//Obtener todas las ordenes hechas por el usuario dado un Id
router.get('/orders/:id', validateToken, getOrderById);

module.exports = { usersRouter: router };
