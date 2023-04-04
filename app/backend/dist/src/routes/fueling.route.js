"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = require("express");
const fueling_controller_1 = __importDefault(require("../controllers/fueling.controller"));
const verifyFuelingDate_1 = require("../middleware/verifyFuelingDate");
const verifyToken_1 = require("../middleware/verifyToken");
class FuelingRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new fueling_controller_1.default();
    }
    addRoute(route = this.controller.route) {
        this.router.get(route, verifyToken_1.verifyToken, this.controller.getAllFueling);
        this.router.get(`${route}/:id`, verifyToken_1.verifyToken, verifyFuelingDate_1.verifyExistsFueling, this.controller.getFueling);
        this.router.post(route, this.controller.createFueling);
        this.router.put(`${route}/:id`, verifyToken_1.verifyToken, verifyFuelingDate_1.verifyExistsFueling, this.controller.updateFueling);
        this.router.delete(`${route}/:id`, verifyToken_1.verifyToken, verifyFuelingDate_1.verifyExistsFueling, this.controller.deleteFueliong);
    }
}
exports.default = FuelingRoute;
