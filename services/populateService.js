const fs = require('fs').promises;
const path = require('path');
const sequelize = require('../config/database'); 
const Animal = require('../models/animal');
const User = require('../models/user');
const Species = require('../models/species');
const Temperament = require('../models/temperament');
const Adoption = require('../models/adoption'); 

async function populateTableFromJSON(model, jsonFilePath) {
  try {
    const data = await fs.readFile(path.join(__dirname, '..', jsonFilePath), 'utf8');
    const records = JSON.parse(data);
    await model.bulkCreate(records, { ignoreDuplicates: true });
  } catch (error) {
    console.error(`Error populating ${model.name}:`, error);
  }
}

async function populateDatabase() {
    await populateTableFromJSON(User, 'public/json/users.json');
    await populateTableFromJSON(Animal, 'public/json/animals.json');
    await populateTableFromJSON(Species, 'public/json/species.json');
    await populateTableFromJSON(Temperament, 'public/json/temperaments.json');
    await populateTableFromJSON(Adoption, 'public/json/adoptions.json'); 
    console.log('All tables populated successfully.');
  }
  
module.exports = { populateDatabase };
