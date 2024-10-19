const sequelize = require("./db");
const Sequelize = require("sequelize");

const Role = require("./role.model");
const UserStore = require("./user.model");
const store = require("./store.model");

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.UserStore = UserStore;
db.Role = Role;
db.Store = store;

//Association
db.UserStore.belongsToMany(db.Role, {
  through: "user_roles",
});
db.Role.belongsToMany(db.UserStore, {
  through: "user_roles",
});

 //One-to-Many : User-Role
db.UserStore.hasMany(db.Store, { foreignKey: "adminId" });
db.Store.belongsTo(db.UserStore, { foreignKey: "adminId" });

module.exports = db;
