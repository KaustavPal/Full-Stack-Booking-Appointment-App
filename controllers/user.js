const express = require("express");
const path = require("path");
const User = require("../models/user");

exports.getUserFormPage = async (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, "../", "views", "index.html"));
  } catch (err) {
    console.log(err);
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
    res.redirect("/user/appointment");
  } catch (err) {
    console.log("Error while adding user details!!!! ", err);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.log("Error while fetching users Details!!!! ", err);
  }
};

exports.deleteUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    await User.destroy({
      where: { id: userId },
    });
    console.log("User Details Deleted");
    res.redirect("/user/appointment");
  } catch (err) {
    console.log(
      "Error while deleting user Details with User ID - " +
        userId +
        "!!!! " +
        err
    );
  }
};
