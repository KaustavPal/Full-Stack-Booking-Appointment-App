const express = require("express");

const router = express.Router();

const userController = require("../controllers/user");

router.get("/appointment", userController.getUserFormPage);

router.post("/appointment", userController.addUser);

router.get("/appointment/user-data", userController.getAllUsers);

router.get("/appointment/deleteUser/:id", userController.deleteUser);

module.exports = router;
