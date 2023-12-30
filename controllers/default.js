const express = require("express");
const path = require("path");
const User = require("../models/user");

exports.userRedirect = async (req, res, next) => {
  try {
    res.redirect("/user/appointment");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
