const express = require('express');

const router = express.Router();
const { body } = require('express-validator');

//Controllers
const {
  createMeal,
  getAllMeals,
  getMealById,
  updateMeal,
  deleteMeal,
} = require('../controllers/meals.controllers');
const {
  validateToken,
  protectAdmin,
} = require('../middlewares/jsonwebtoken.middleware');
const { checkValidations } = require('../middlewares/validations.middlewares');

//Crear Meal
router.post(
  '/:id',
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('price').notEmpty().withMessage('Name cannot be empty'),
  checkValidations,
  createMeal
);

//Obtener rodas las Meals que esten active
router.get('/', getAllMeals);

//Obtener Meals active por Id
router.get('/:id', getMealById);

//Actualizar Meal
router.patch('/:id', validateToken, protectAdmin, updateMeal);

//Eliminar Meal
router.delete('/:id', validateToken, protectAdmin, deleteMeal);

module.exports = { mealsRouter: router };
