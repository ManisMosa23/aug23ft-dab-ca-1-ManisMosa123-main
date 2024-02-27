

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Species = sequelize.define(
  "Species",
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

module.exports = Species;
