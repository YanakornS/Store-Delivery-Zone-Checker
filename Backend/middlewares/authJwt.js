const jwt = require("jsonwebtoken");
const config = require("../Config/auth.config");
const db = require("../Models");
const UserStore = db.UserStore;
const User = db.User;



//Verify Token
verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id; //jwt.sign
    next();
  });
};



//isAdmin?
isAdmin = (req, res, next) => {
  UserStore.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(401).send({ message: "Require Admin Role!" });
      return;
    });
  });
};

//isMod?
isMod = (req, res, next) => {
  UserStore.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }
      res.status(401).send({ message: "Require Moderator Role!" });
      return;
    });
  });
};

///isModOrAdmin
isModOrAdmin = (req, res, next) => {
  UserStore.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin" || roles[i].name === "moderator") {
          next();
          return;
        }
      }
      res.status(401).send({ message: "Require Admin or Moderator Role!" });
      return;
    });
  });
};






const authJwt = {
  verifyToken,
  isAdmin,
  isMod,
  isModOrAdmin,
};

module.exports = authJwt;
