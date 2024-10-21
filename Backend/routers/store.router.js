const express = require("express");
const router = express.Router();
const storeController = require("../Controllers/store.controller");
const { authJwt } = require("../middlewares");
const { verifySingUp } = require("../middlewares");

//http://localhost:5000/api/v1/store

//Create a restaurant

router.post("/", [authJwt.verifyToken, authJwt.isAdmin, verifySingUp.checkStoreName],storeController.create);

//Get a restaurant

router.get("/", storeController.getAll);

//Get a restaurant BY Id

router.get("/:id", [authJwt.verifyToken, authJwt.isModOrAdmin ],storeController.getById);

//Update a restaurant
router.put("/:id", [authJwt.verifyToken, authJwt.isModOrAdmin,verifySingUp.checkStoreName], storeController.update);

//Delete a restaurant
router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin ], storeController.delete); 

module.exports = router;
