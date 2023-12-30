const express = require("express");

const router = express.Router();

const defaultController = require("../controllers/default");

router.get("/", defaultController.userRedirect);

module.exports = router;
