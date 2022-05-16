const express = require("express");

const router = express.Router();

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
} = require("../controllers/restaurants.controllers");

//Crear nuevo restaurante
router.post("/", createNewRestaurant);

//Obtener todos los resturantes activos
router.get("/", getAllRestaurant);

//Obtener restaurantes por Id
router.get("/:id", getRestaurantById);

//Actualizar restaurante
router.patch("/:id", updateRestaurant);

//Deshabilitar restaurante
router.delete("/:id", deleteRestaurant);

//Crear nueva reseña del restaurante
router.post("/reviews/:id", createRestaurantReview);

//Actualizar reseña del restaurante
router.patch("/reviews/:id", updateRestaurantReview);

//Eliminar reseña del restaurante
router.delete("/reviews/:id", deleteRestaurantReview);

module.exports = { restaurantsRouter: router };
