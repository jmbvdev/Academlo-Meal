const { Meal } = require("../models/meal.model");
const { Order } = require("../models/order.model");
const { User } = require("../models/user.model");

const createOrder = async (req, res) => {
  try {
    const { quantity, mealId, userId} = req.body;
  
    const meal= await Meal.findOne({where:{id:mealId}})

    if (meal) {
      const total= quantity*meal.price
      const newOrder = await Order.create({
        quantity,
        mealId,
        userId,
        totalPrice:total,
      });


      res.status(201).json({ newOrder });
    } else{
      res.status(400).json({status:"error"})
    }

      
    

  } catch (error) {
    console.log(error);
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [{ model: Meal }, { model: User }],
    });
    res.status(200).json({
      orders,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({ where: { id } });
    if (order.status==="active") {
      await order.update({ status: "completed" });
      res.status(200).json({ status: "success" });
    }
    else{
      res.status(400).json({ status: "error" })
    }

  } catch (error) {
    console.log(error);
  }
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findOne({ where: { id } });
  await order.update({ status: "cancelled" });
  res.status(200).json({
    status: "success",
  });
};

module.exports = { createOrder, getOrders, updateOrder, deleteOrder };
