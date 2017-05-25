"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
exports.router = router;
const CityController_1 = require("./CityController");
const cityController = new CityController_1.CityController();
router.get('/cities/program', cityController.actionProgramList);
router.get('/cities', cityController.actionSearch);
