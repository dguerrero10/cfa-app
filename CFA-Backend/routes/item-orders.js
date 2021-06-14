const express = require("express");

const router = express.Router();

const ItemOrder = require('../models/item-order');

router.post("", (req, res, next) => {
    const itemOrder = new ItemOrder({
        workAreaItem: req.body.workAreaItem,
        areasSearched: req.body.areasSearched,
        itemsNeeded: req.body.itemsNeeded,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    });
    itemOrder.save();
    res.status(201).json({
        success: true
    });
});

router.get("", (req, res, next) => {
    ItemOrder.find().sort({_id: -1})
        .then(itemOrderData => {
            res.status(201).json({
                success: true,
                itemOrderData: itemOrderData
            });
        });
});

router.delete(":id", (req, res, next) => {
    console.log(req.params)
});

module.exports = router;