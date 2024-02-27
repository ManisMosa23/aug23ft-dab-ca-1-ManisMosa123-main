

const sequelize = require("../config/database");

const User = require("./user");
const Animal = require("./animal");
const Adoption = require("./adoption");
const Species = require("./species");
const Temperament = require("./temperament");

User.hasMany(Adoption, { foreignKey: "userId" });
Adoption.belongsTo(User, { foreignKey: "userId" });

Animal.hasOne(Adoption, { foreignKey: "animalId" });
Adoption.belongsTo(Animal, { foreignKey: "animalId" });
Animal.belongsTo(Species, { foreignKey: "speciesId" });
Species.hasMany(Animal, { foreignKey: "speciesId" });

Animal.belongsToMany(Temperament, { through: "AnimalTemperament" });
Temperament.belongsToMany(Animal, { through: "AnimalTemperament" });

// Sync models with the database
sequelize
  .sync({ force: false })
  .then(() => console.log("Models and associations have been synchronized"))
  .catch((error) =>
    console.error("Failed to sync models and associations", error)
  );

module.exports = {
  User,
  Animal,
  Adoption,
  Species,
  Temperament,
};
