const { Router } = require("express");
const purchasingRoute = require("./purchasing");

const route = Router();

route.use("/purchasing", purchasingRoute);

module.exports = route;
