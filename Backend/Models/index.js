const sequelize = require("./db");
const Sequelize = require("sequelize");

const Role = require("./role.model");
const UserStore = require("./user.model");

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.UserStore = UserStore;
db.Role = Role;

//Association
db.UserStore.belongsToMany(db.Role, {
  through: "user_roles",
});
db.Role.belongsToMany(db.UserStore, {
  through: "user_roles",
});

module.exports = db;
