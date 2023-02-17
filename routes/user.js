const express = require("express");

const { login, signUp, lo, si,logOut } = require("../controller/user");
const route = express.Router();

route.post("/login", login);
route.post("/sign-up", signUp);
route.get("/lo", lo);
route.get("/si", si);
route.get("/log-out", logOut)
module.exports = route;
