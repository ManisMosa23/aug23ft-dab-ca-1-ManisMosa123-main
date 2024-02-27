

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Adoption = sequelize.define(
  "Adoption",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    adoptionDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Adoption;