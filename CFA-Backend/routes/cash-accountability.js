const express = require("express");

const checkAuth = require('../middleware/check-auth');

const CashAccountability = require('../controllers/cash-accountability');

const router = express.Router();

router.post("", checkAuth, CashAccountability.createCashAccountability);
router.post("/delete", checkAuth, CashAccountability.deleteCashAccountability); 
router.get("", checkAuth, CashAccountability.getCashAccountability);
    
module.exports = router;