const { Order } = require('../models/order.model');
const { Review } = require('../models/review.model');
const { User } = require('../models/user.model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { validationResult } = require('express-validator');
const { Meal } = require('../models/meal.model');
const { Restaurant } = require('../models/restaurant.model');

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const newUser = await User.create({ name, email, password, role });
    res.status(201).json({ newUser });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Validate that User exist with given email
    const user = await User.findOne({
      where: { email, password, status: 'active' },
    });

    if (!user) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Invalid email or password' });
    }

    //Generate JWT
    const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.status(200).json({ token, user });
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findOne({ where: { id: req.user.id } });

    await user.update({ name, email });
    res.status(200).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    await user.update({ status: 'deleted' });
    res.status(200).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      include: [
        { model: Meal, include: { model: Restaurant } },
        { model: User },
      ],
    });
    res.status(200).json({
      orders,
    });
  } catch (error) {
    console.log(error);
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await User.findOne({ where: { id } });
    res.status(200).json({ order });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUser,
  login,
  updateUser,
  deleteUser,
  getAllOrders,
  getOrderById,
};
