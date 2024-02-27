const express = require("express");
const router = express.Router();
const { sequelize } = require("../config/database");
const { QueryTypes } = require("sequelize");
const Animal = require("../models/animal");
const Adoption = require("../models/adoption");
const { ensureAuthenticated, ensureAdmin } = require("../config/auth");

// Adopt an animal (POST)
router.post("/adopt/:id", ensureAuthenticated, async (req, res) => {
  const { id } = req.params;
  try {
    const animal = await Animal.findOne({ where: { id, adopted: false } });
    if (!animal) {
      return res.status(400).send("Animal not available for adoption");
    }
    await Adoption.create({ userId: req.user.id, animalId: id });
    await animal.update({ adopted: true });
    res.redirect("/animals");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adopting animal");
  }
});

// Cancel an adoption (POST)
router.post("/cancel-adoption/:id", ensureAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const adoption = await Adoption.findOne({ where: { animalId: id } });
    if (!adoption) {
      return res.status(400).send("Adoption record not found");
    }
    await Animal.update({ adopted: false }, { where: { id } });
    await adoption.destroy();
    res.redirect("/animals");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error canceling adoption");
  }
});

// Fetch all animals
router.get("/api/all-animals", async (req, res) => {
  try {
    const animals = await Animal.findAll();
    res.json(animals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching animals" });
  }
});

// Fetch popular animal names
router.get("/api/popular-animal-names", async (req, res) => {
  try {
    const animals = await sequelize.query(
      "SELECT name, COUNT(*) FROM Animals GROUP BY name ORDER BY COUNT(*) DESC",
      { type: QueryTypes.SELECT }
    );
    res.json(animals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching popular animal names" });
  }
});

// Fetch all adoption details
router.get("/api/adoption-details", async (req, res) => {
  try {
    const adoptions = await sequelize.query("SELECT * FROM Adoptions", {
      type: QueryTypes.SELECT,
    });
    res.json(adoptions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching adoption details" });
  }
});

// Fetch animals by age
router.get("/api/animals-by-age", async (req, res) => {
  try {
    const animals = await sequelize.query(
      "SELECT *, TIMESTAMPDIFF(YEAR, birthday, CURDATE()) AS age FROM Animals ORDER BY age DESC",
      { type: QueryTypes.SELECT }
    );
    res.json(animals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching animals by age" });
  }
});

// Fetch animals born in date range
router.get("/api/animals-born-in-date-range", async (req, res) => {
  const startDate = req.query.startDate || "2020-01-01"; // Example usage of query params
  const endDate = req.query.endDate || "2021-01-01";
  try {
    const animals = await sequelize.query(
      `SELECT * FROM Animals WHERE birthday BETWEEN '${startDate}' AND '${endDate}'`,
      { type: QueryTypes.SELECT }
    );
    res.json(animals);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching animals born in date range" });
  }
});

router.get("/api/number-of-animals-per-size", async (req, res) => {
  try {
    const sizes = await sequelize.query(
      "SELECT size, COUNT(*) FROM Animals GROUP BY size",
      { type: QueryTypes.SELECT }
    );
    res.json(sizes);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching number of animals per size" });
  }
});

router.get("/", async function (req, res, next) {
  // const animals = await animalService.getAll();
  let animals = [
    {
      Id: 1,
      Name: "Coco",
      Species: "Dwarf Hamster",
      Birthday: "2020-02-12",
      Temperament: "calm, scared",
      Size: "small",
      Adopted: false,
    },
    {
      Id: 2,
      Name: "Ted",
      Species: "Tedy bear hamster",
      Birthday: "2021-02-12",
      Temperament: "calm, scared",
      Size: "small",
      Adopted: false,
    },
    {
      Id: 3,
      Name: "Coco",
      Species: "Jack-Russel",
      Birthday: "2020-02-12",
      Temperament: "energetic",
      Size: "medium",
      Adopted: false,
    },
  ];

  res.render("animals", { user: null, animals: animals });
});

module.exports = router;
