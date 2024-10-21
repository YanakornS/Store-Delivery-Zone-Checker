const Role = require("../Models/role.model");
const { Op } = require("sequelize");
const  UserStore  = require("../Models/user.model");
const Store = require("../Models/store.model");

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  // check username
  const userByUsername = await UserStore.findOne({
    where: {
      username: req.body.username,
    },
  });

  if (userByUsername) {
   res
      .status(400)
      .send({ message: "Failed! Username is already in use!" });
      return ;
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
//Check StoreName
checkStoreName = async (req, res, next) => {
  const { storeName } = req.body;
  await Store.findOne({
    where: { storeName }
  }).
  then((store) => {
    if (store) {
       res.status(400).send({ message: "Failed! Store name already exists!" });
       return;
    }
    next();
  })
}


// Check UserID
checkUserID = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const store = await UserStore.findOne({
      where: { userId },
    });

    if (store) {
      return res.status(400).send({ message: "Failed! Store name already exists for this user!" });
    }

    next();
  } catch (error) {
    res.status(500).send({
      message: error.message || "An error occurred while checking the user ID.",
    });
  }
};





const verifySignUp = {
  checkRolesExisted,
  checkDuplicateUsernameOrEmail,
  checkStoreName,
  checkUserID,
};

module.exports = verifySignUp;
