const express = require('express');
const router = express.Router();
const Temperament = require('../models/temperament'); 
const { ensureAdmin } = require("../config/auth");

// Display all temperaments
router.get('/', async (req, res, next) => {
    try {
        const temperaments = await Temperament.findAll();
        res.render("temperament", { user: req.user, temperaments });
    } catch (error) {
        console.error('Error fetching temperaments:', error);
        res.render("error", { message: "Error fetching temperaments" });
    }
});

// Add new temperament
router.post('/add', ensureAdmin, async (req, res) => {
    try {
        await Temperament.create({ name: req.body.name });
        res.redirect('/temperament');
    } catch (error) {
        console.error('Error adding temperament:', error);
        res.render("error", { message: "Error adding temperament" });
    }
});

// Update temperament
router.post('/update/:id', ensureAdmin, async (req, res) => {
    try {
        await Temperament.update({ name: req.body.name }, { where: { id: req.params.id } });
        res.redirect('/temperament');
    } catch (error) {
        console.error('Error updating temperament:', error);
        res.render("error", { message: "Error updating temperament" });
    }
});

// Delete temperament
router.post('/delete/:id', ensureAdmin, async (req, res) => {
    try {
        await Temperament.destroy({ where: { id: req.params.id } });
        res.redirect('/temperament');
    } catch (error) {
        console.error('Error deleting temperament:', error);
        res.render("error", { message: "Error deleting temperament" });
    }
});

module.exports = router;
