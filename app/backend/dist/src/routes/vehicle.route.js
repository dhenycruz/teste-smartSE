"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = require("express");
const vehicle_controller_1 = __importDefault(require("../controllers/vehicle.controller"));
const verifyVehicle_1 = require("../middleware/verifyVehicle");
const verifyToken_1 = require("../middleware/verifyToken");
class CarRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new vehicle_controller_1.default();
    }
    addRoute(route = this.controller.route) {
        this.router.get(route, verifyToken_1.verifyToken, this.controller.getAllVehicles);
        this.router.get(`${route}/:id`, verifyToken_1.verifyToken, this.controller.getVehicle);
        this.router.post(route, verifyToken_1.verifyToken, verifyVehicle_1.verifyExistsVechicleRenavan, verifyVehicle_1.verifyExistsVechicleChassi, this.controller.createVehicle);
        this.router.patch(`${route}/:id`, verifyToken_1.verifyToken, verifyVehicle_1.verifyExistsVechicle, this.controller.updateVehicle);
        this.router.delete(`${route}/:id`, verifyToken_1.verifyToken, verifyVehicle_1.verifyExistsVechicle, this.controller.deleteVehicle);
    }
}
exports.default = CarRouter;
