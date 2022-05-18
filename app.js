const express = require('express');

//Routes
const { usersRouter } = require('./routers/users.routes');
const { ordersRouter } = require('./routers/orders.routes');
const { mealsRouter } = require('./routers/meals.routes');
const { restaurantsRouter } = require('./routers/restaurants.routes');
const { reviewsRouter } = require('./routers/reviews.routes');

//Models
const { Meal } = require('./models/meal.model');
const { Order } = require('./models/order.model');
const { Restaurant } = require('./models/restaurant.model');
const { Review } = require('./models/review.model');
const { User } = require('./models/user.model');

//Utils
const { db } = require('./utils/database');

const app = express();

//Enable incoming JSON data
app.use(express.json());

//Endpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/orders', ordersRouter);
app.use('/api/v1/meals', mealsRouter);
app.use('/api/v1/restaurants', restaurantsRouter);
app.use('/api/v1/reviews', reviewsRouter);

//Authenticate db credentials
db.authenticate()
  .then(() => console.log('Database athenticate'))
  .catch(err => console.log(err));

//Establish models relations

// 1 Restaurant <-----> M Meals
// 1 Meal <----> 1 Order (mealId)

Restaurant.hasMany(Meal);
Meal.belongsTo(Restaurant);

Meal.hasMany(Order);
Order.belongsTo(Meal);

//1 restaurant <---> M reviews
//1 Users <---> M revies
//1User <---> M Orders

Restaurant.hasMany(Review);
Review.belongsTo(Restaurant);

User.hasMany(Review);
Review.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

//sync sequilize models
db.sync()
  .then(() => console.log('Databse sync'))
  .catch(err => console.log(err));

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Express app running on port ${PORT}`);
});
