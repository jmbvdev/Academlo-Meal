const { Meal } = require('../models/meal.model');
const { Restaurant } = require('../models/restaurant.model');
const { Review } = require('../models/review.model');
const jwt = require('jsonwebtoken');

const createNewRestaurant = async (req, res) => {
  try {
    const { name, address, rating } = req.body;

    const newRestaurant = await Restaurant.create({ name, address, rating });
    res.status(201).json({ newRestaurant });
  } catch (error) {
    console.log(error);
  }
};

const getAllRestaurant = async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll({
      include: [{ model: Meal }, { model: Review }],
    });
    res.status(200).json({
      restaurants,
    });
  } catch (error) {
    console.log(error);
  }
};

const getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findOne({ where: { id } });
    res.status(200).json({ restaurant });
  } catch (error) {
    console.log(error);
  }
};

const updateRestaurant = async (req, res) => {
  try {
    const { name, address } = req.body;
    const { id } = req.params;
    const restaurant = await Restaurant.findOne({ where: { id } });

    await restaurant.update({ name, address });
    res.status(200).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};

const deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findOne({ where: { id } });
    await restaurant.update({ status: 'deleted' });
    res.status(200).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};

const createRestaurantReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment, rating, userId } = req.body;
    const restaurant = await Restaurant.findOne({ where: { id } });
    const newReview = await Review.create({
      comment,
      rating,
      restaurantId: id,
      userId,
    });
    res.status(201).json({ newReview });
  } catch (error) {
    console.log(error);
  }
};

const updateRestaurantReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment, rating } = req.body;
    const review = await Review.findOne({ where: { id } });
    console.log(review);

    await review.update({ comment, rating });
    res.status(200).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};

const deleteRestaurantReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Restaurant.findOne({ where: { id } });
    await review.update({ status: 'deleted' });
    res.status(200).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createNewRestaurant,
  getAllRestaurant,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  createNewRestaurant,
  updateRestaurant,
  deleteRestaurantReview,
  createRestaurantReview,
  updateRestaurantReview,
};
