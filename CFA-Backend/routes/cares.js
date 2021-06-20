const express = require("express");

const checkAuth = require('../middleware/check-auth');

const CareControllers = require('../controllers/cares');

const router = express.Router();

router.post("", checkAuth, CareControllers.createCare);
router.post("/delete", checkAuth, CareControllers.deleteCares);
router.get("", checkAuth, CareControllers.getCares);

module.exports = router;