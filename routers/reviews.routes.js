const express = require('express');

const router = express.Router();

//Controllers
const {
  getReview,
  createReview,
  deleteReview,
  updateReview,
} = require('../controllers/reviews.controllers');

//Crear nuevo Review
router.post('/', createReview);

//Obtener todos los resturantes activos
router.get('/', getReview);

//Actualizar restaurante
router.patch('/:id', updateReview);

//Deshabilitar restaurante
router.delete('/:id', deleteReview);

module.exports = { reviewsRouter: router };
