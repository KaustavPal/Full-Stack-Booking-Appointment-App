const Sequelize = require("sequelize");

const sequelize = new Sequelize("booking_appointment", "root", "8100472356", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
