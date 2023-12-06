const express = require("express");
const path = require("path");
const User = require("../models/user");

exports.getUserFormPage = async (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, "../", "views", "index.html"));
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.addUser = async (req, res, next) => {
  try {
    const userName = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const date = req.body.date;
    const time = req.body.time;
    await User.create({
      name: userName,
      email: email,
      phone: phone,
      date: date,
      time: time,
    });
    console.log("User Details Added");
    res.status(201).json({ message: "User Details Added Successfully" });
  } catch (err) {
    console.log("Error while adding user details!!!! ", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.log("Error while fetching users Details!!!! ", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const userDetails = await User.findByPk(id);
    res.json(userDetails);
  } catch (err) {
    console.log(
      "Error while fetching user Details using ID - " + id + "!!! " + err
    );
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.editUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const userName = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const date = req.body.date;
    const time = req.body.time;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    (user.name = userName),
      (user.email = email),
      (user.phone = phone),
      (user.date = date),
      (user.time = time),
      await user.save();
    console.log("User Details Updated");
    res.status(200).json({ message: "User Details updated successfully" });
  } catch (err) {
    console.error("Error while updating User Details:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    await User.destroy({
      where: { id: userId },
    });
    console.log("User Details Deleted");
    res.status(204).send();
  } catch (err) {
    console.log(
      "Error while deleting user Details with User ID - " +
        userId +
        "!!!! " +
        err
    );
    res.status(500).json({ error: "Internal server error" });
  }
};
