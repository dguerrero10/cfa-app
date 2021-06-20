const express = require("express");

const checkAuth = require('../middleware/check-auth');

const ItemOrderController = require('../controllers/item-order');

const router = express.Router();

router.post("", checkAuth, ItemOrderController.createItemOrder);
router.post("/delete", checkAuth, ItemOrderController.deleteItemOrders);
router.get("", checkAuth, ItemOrderController.getItemOrders);

module.exports = router;