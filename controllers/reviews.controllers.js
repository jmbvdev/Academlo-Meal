const { Review } = require('../models/review.model');

const createReview = async (req, res) => {
  try {
    const { comment, rating, userId, restaurantId } = req.body;

    const newReview = await Review.create({
      comment,
      rating,
      userId,
      restaurantId,
    });
    res.status(201).json({ newReview });
  } catch (error) {
    console.log(error);
  }
};

const getReview = async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.status(200).json({
      reviews,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findOne({ where: { id } });

    await review.update({ status: 'completed' });
    res.status(200).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};

const deleteReview = async (req, res) => {
  const { id } = req.params;
  const review = await Review.findOne({ where: { id } });
  await review.update({ status: 'cancelled' });
  res.status(200).json({
    status: 'success',
  });
};

module.exports = { createReview, getReview, updateReview, deleteReview };
