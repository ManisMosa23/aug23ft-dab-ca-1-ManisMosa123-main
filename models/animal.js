

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Animal = sequelize.define(
  "Animal",
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
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    adopted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {}
);

module.exports = Animal;
