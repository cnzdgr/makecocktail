const moment = require('moment');
const mongooese = require('mongoose');

const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth'); 
const admin = require('../middleware/admin');
const { Drink, validate } = require('../models/drink');
const { ShortDrink, validateShort } = require('../models/shortDrink');
const { User } = require("../models/user");


const makeFirstLetterUpper = ((stringInput) => {
    stringInput = stringInput.charAt(0).toUpperCase() + stringInput.slice(1);
});

//Get all cocktails
//Sorted by name, will be sorted by # of favorites in the later stages
router.get("/", async (req, res) => {
    let getQuery = req.query
    const drinks = await Drink.find(getQuery).maxTimeMS(500)
        .select("-__v")                
        .sort("name");
    res.send(drinks);
});

router.get("/popular", async (req, res) => {
    const popularDrinks = await Drink.find({ popular: true })
        .select("-__v")                
        .sort("name");
    res.send(popularDrinks);
});

router.get("/short", async (req, res) => {
    const shortDrinks = await ShortDrink.find()
        .select("-__v")                
        .sort("name");
    res.send(shortDrinks);
});

//Get a single drink to be shown on the drinks page
//Does not require auth
router.get("/:name", async (req, res) => {
    const drinkName = makeFirstLetterUpper(req.params.name);
    const drink = await Drink.findOne({name: drinkName}).select("-__v");

    if(!drink) return res.status(404).send("No cocktail with this name is found, sorry");
    res.send(drink);
});


//Only admin can send new cocktail
router.post("/", [auth, admin], async (req,res) => {
    //JOI validation
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let drink = await Drink.findOne({ name: req.body.name });
    if (drink) return res.status(400).send("There is already a cocktail with a given name, please check that one");

    const newDrink = new Drink({
        name: req.body.name,
        logo: req.body.logo,
        description: req.body.description,
        tags: req.body.tags,
        ingredients: req.body.ingredients,
        mix: req.body.mix,
        creationDate: moment().toJSON()
    });

    const newShortDrink = new ShortDrink({
        name: req.body.name,
        tags: req.body.tags
    })

    if(!newDrink) return res.status(404).send("Could not create such a cocktail, sorry");
    await newDrink.save();
    await newShortDrink.save();
    res.send(newDrink);
});


router.put("/:name", [auth, admin], async (req, res) => {
    const drinkName = makeFirstLetterUpper(req.params.name);

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const drink = await Drink.findOneAndUpdate(
        {name: drinkName},
        {
            name: req.body.name,
            logo: req.body.logo,
            description: req.body.description,
            tags: req.body.description,
            ingredients: req.body.ingredients,
            mix: req.body.mix,
        },
        { new: true}
    );

    if (!drink) return res.status(404).send("No cocktail with the given name, update is not possible")

    res.send(drink);
})

//Delete the given cocktail (only admin) using the name of the cocktail
//Cocktail path: ...com/drinks/martini
//No batch delete method will be implemented for DB security
router.delete("/:name", [auth, admin], async (req,res) => {
    const drinkName = makeFirstLetterUpper(req.params.name);

    const drink = await Drink.findOneAndDelete({name: drinkName});
    if(!drink) return res.status(404).send("The cocktail with the given name does not exist anyways, it seems there is no need to delete");
    const shortDrink = await ShortDrink.findOneAndDelete({name:drinkName});

    res.send(drink);
});

module.exports = router;
