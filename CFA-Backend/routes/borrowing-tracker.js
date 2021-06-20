const express = require("express");

const checkAuth = require('../middleware/check-auth');

const BorrowingTrackerController = require('../controllers/borrowing-tracker');

const router = express.Router();

router.post("", checkAuth, BorrowingTrackerController.createBorrowingTrackerItem);
router.post("/delete", checkAuth, BorrowingTrackerController.deleteBorrowingTrackerItems);
router.get("", checkAuth, BorrowingTrackerController.getBorrowingTrackerItems);
    
module.exports = router;