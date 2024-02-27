

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Temperament = sequelize.define(
  "Temperament",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {}
);

module.exports = Temperament;
