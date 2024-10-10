const Role = require("../Models/role.model");
const { Op } = require("sequelize");
const { UserStore } = require("../Models/user.model");

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  // check username
  const userByUsername = await UserStore.findOne({
    where: {
      username: req.body.username,
    },
  });

  if (userByUsername) {
    return res
      .status(400)
      .send({ message: "Failed! Username is already in use!" });
  }

  next();
};

//Check roles are valid
checkRolesExisted = async (req, res, next) => {
  if (req.body.roles) {
    Role.findAll({
      where: {
        name: { [Op.or]: req.body.roles },
      },
    }).then((roles) => {
      if (roles.length !== req.body.roles.length) {
        res.status(400).send({ message: "Failed! Role does not exist." });
        return;
      }
      next();
    });
  } else {
    next();
  }
};

const verifySignUp = {
  checkRolesExisted,
  checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;
