var express = require("express");
var router = express.Router();
const Species = require("../models/species");
const { ensureAdmin } = require("../config/auth");

// Display species list
router.get("/", async function (req, res, next) {
  try {
    const speciesList = await Species.findAll();
    res.render("species", { user: req.user, species: speciesList });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching species");
  }
});

// Add a new species
router.post("/add", ensureAdmin, async function (req, res, next) {
  try {
    const { name } = req.body;
    await Species.create({ name });
    res.redirect("/species");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding species");
  }
});

// Update an existing species
router.post("/update/:id", ensureAdmin, async function (req, res, next) {
  try {
    const { id } = req.params;
    const { name } = req.body;
    await Species.update({ name }, { where: { id } });
    res.redirect("/species");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating species");
  }
});

// Delete a species
router.post("/delete/:id", ensureAdmin, async function (req, res, next) {
  try {
    const { id } = req.params;
    await Species.destroy({ where: { id } });
    res.redirect("/species");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting species");
  }
});

module.exports = router;
