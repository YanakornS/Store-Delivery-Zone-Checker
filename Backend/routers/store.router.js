const express = require("express");
const router = express.Router();
const storeController = require("../Controllers/store.controller");
const verifyToken = require("../middlewares/authJwt").verifyToken;
const { authJwt } = require("../middlewares");

//http://localhost:5000/api/v1/store

//Create a restaurant

router.post("/", verifyToken, storeController.create);

//Get a restaurant

router.get("/", storeController.getAll);

//Get a restaurant BY Id

router.get("/:id", storeController.getById);

//Update a restaurant
router.put("/:id", verifyToken, storeController.update);

//Delete a restaurant
router.delete("/:id", verifyToken, storeController.delete); 

module.exports = router;
