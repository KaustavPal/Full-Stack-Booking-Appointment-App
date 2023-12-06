const express = require("express");

const router = express.Router();

const userController = require("../controllers/user");

router.get("/appointment", userController.getUserFormPage);

router.post("/appointment", userController.addUser);

router.get("/appointment/user-data", userController.getAllUsers);

router.get("/appointment/getUser/:id", userController.getUser);

router.delete("/appointment/deleteUser/:id", userController.deleteUser);

router.put("/appointment/editUser/:id", userController.editUser);

module.exports = router;
