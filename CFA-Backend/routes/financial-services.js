const express = require("express");

const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');

const FinancialServiceController = require('../controllers/financial-services');

const router = express.Router();

router.post("", checkAuth, extractFile, FinancialServiceController.createFinancialService);
router.post("/delete", checkAuth, FinancialServiceController.deleteFinancialService);
router.get("", checkAuth, FinancialServiceController.getFinancialServices);
    
module.exports = router;