const express = require("express");

const rout = express.Router();
const { AuthCheck } = require("../middleware/authMiddleware");
const controller = require("../controller/handlers");

rout.post("/order", controller.addData);
rout.get("/", AuthCheck, controller.findAll);
rout.get("/see/:id", controller.FindOne);
rout.delete("/delete/:id", controller.deleteData);

rout.get("/update/:id", controller.updatePage);

rout.post("/change/:id", controller.change);

module.exports = rout;
