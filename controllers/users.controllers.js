const { Order } = require("../models/order.model");
const { Review } = require("../models/review.model");
const { User } = require("../models/user.model");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newUser = await User.create({ name, email, password });
    res.status(201).json({ newUser });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Validate that User exist with given email
    const user= await User.findOne({where:{email,password,status:"active"}})

    if (!user) {
        return res.status(400).json({status:"error", message:"Invalid email or password"})
    }

    //Generate JWT
    const token= await jwt.sign({id:user.id}, "secret",{expiresIn: "365d"})
    res.status(200).json( {user , token});

  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });

    await user.update({ name, email });
    res.status(200).json({ status: "success" });
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    await user.update({ status: "deleted" });
    res.status(200).json({ status: "success" });
  } catch (error) {
    console.log(error);
  }
};

const getAllOrders = async (req, res) => {
  try {
      let token;

      if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
          token=req.headers.authorization.split("")[1]
      }
      if (!token) {
          return res.status(403).json({status: "error", message: "Session invalid"})  
      }




    const orders = await User.findAll({
      include: [{ model: Review }, { model: Order }],
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
