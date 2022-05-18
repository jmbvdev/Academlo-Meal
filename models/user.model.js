const { DataTypes } = require('sequelize');
// traigo mi conexion a mi base de datos
const { db } = require('../utils/database');

//Utilizamos el metodo define para definir un nuevo modelo

const User = db.define('user', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'active',
  },
  role: {
    type: DataTypes.STRING,
  },
});
module.exports = { User };
