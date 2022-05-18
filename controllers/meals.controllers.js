const { Meal } = require('../models/meal.model');
const { Order } = require('../models/order.model');

const createMeal = async (req, res) => {
  try {
    const { name, price, restaurantId } = req.body;
    const { id } = req.params;
    const meal = await Meal.create({ name, price, restaurantId });
    res.status(201).json({ meal });
  } catch (error) {
    console.log(error);
  }
};

const getAllMeals = async (req, res) => {
  try {
    const meals = await Meal.findAll({ include: [{ model: Order }] });
    res.status(200).json({
      meals,
    });
  } catch (error) {
    console.log(error);
  }
};

const getMealById = async (req, res) => {
  try {
    const { id } = req.params;
    const meal = await Meal.findOne({ where: { id } });
    res.status(200).json({ meal });
  } catch (error) {
    console.log(error);
  }
};

const updateMeal = async (req, res) => {
  try {
    const { name, price } = req.body;
    const { id } = req.params;
    const meal = await Meal.findOne({ where: { id } });

    await meal.update({ name, price });
    res.status(200).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};

const deleteMeal = async (req, res) => {
  try {
    const { id } = req.params;
    const meal = await Meal.findOne({ where: { id } });
    await meal.update({ status: 'deleted' });
    res.status(200).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createMeal,
  getAllMeals,
  getMealById,
  updateMeal,
  deleteMeal,
};
