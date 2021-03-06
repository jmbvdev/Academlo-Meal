const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { User } = require('../models/user.model');

const generateToken = async (req, res, next) => {
  try {
    const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    next();
  } catch (error) {
    console.log(error);
  }
};

const validateToken = async (req, res, next) => {
  try {
    let token;

    //extract troken from header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res
        .status(403)
        .json({ status: 'error', message: 'Session invalid' });
    }

    //validate token

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { id: decoded.id } });
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};

const protectOwnerAccount = async (req, res, next) => {
  try {
    console.log(req.user.role);

    if (req.user.role !== 'admin') {
      return res
        .status(403)
        .json({
          status: 'error',
          message: 'You dont have the admin permission',
        });
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

const protectAdmin = async (req, res, next) => {
  try {
    if (req.user.id === Number(req.params.id)) {
      return next();
    }
    if (req.user.role !== 'admin') {
      return res
        .status(403)
        .json({ status: 'error', message: 'You dont own this account' });
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  generateToken,
  validateToken,
  protectAdmin,
  protectOwnerAccount,
};
