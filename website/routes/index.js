const app = require("express").Router();
const Premium = require("./premium");

app.get("/premium", Premium);