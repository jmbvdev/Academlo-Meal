const express = require('express');

const router = express.Router();
const { body } = require('express-validator');

//Controllers
const {
  createNewRestaurant,
  getAllRestaurant,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  createRestaurantReview,
  deleteRestaurantReview,
  updateRestaurantReview,
} = require('../controllers/restaurants.controllers');
const {
  validateToken,
  protectOwnerAccount,
} = require('../middlewares/jsonwebtoken.middleware');
const { checkValidations } = require('../middlewares/validations.middlewares');

//Crear nuevo restaurante
router.post(
  '/',
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('address').notEmpty().withMessage('Address cannot be empty'),
  body('rating')
    .notEmpty()
    .withMessage('Rating cannot be empty')
    .isFloat({ min: 5, max: 5 })
    .withMessage('Rating must be a number between 0 and 5'),
  checkValidations,
  createNewRestaurant
);

//Obtener todos los resturantes activos
router.get('/', getAllRestaurant);

//Obtener restaurantes por Id
router.get('/:id', getRestaurantById);

//Actualizar restaurante
router.patch('/:id', validateToken, updateRestaurant);

//Deshabilitar restaurante
router.delete('/:id', validateToken, deleteRestaurant);

//Crear nueva reseña del restaurante
router.post(
  '/reviews/:id',
  validateToken,
  protectOwnerAccount,
  createRestaurantReview
);

//Actualizar reseña del restaurante
router.patch(
  '/reviews/:id',
  validateToken,
  protectOwnerAccount,
  updateRestaurantReview
);

//Eliminar reseña del restaurante
router.delete(
  '/reviews/:id',
  validateToken,
  protectOwnerAccount,
  deleteRestaurantReview
);

module.exports = { restaurantsRouter: router };
