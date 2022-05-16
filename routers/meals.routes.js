const express = require("express");

const router = express.Router();

//Controllers
const {createMeal,getAllMeals,getMealById,updateMeal,deleteMeal}=require("../controllers/meals.controllers")

//Crear Meal
router.post("/:id", createMeal);

//Obtener rodas las Meals que esten active
router.get("/" , getAllMeals);

//Obtener Meals active por Id
router.get("/:id" , getMealById);

//Actualizar Meal
router.patch("/:id", updateMeal);

//Eliminar Meal
router.delete("/:id", deleteMeal);


module.exports = { mealsRouter: router };
