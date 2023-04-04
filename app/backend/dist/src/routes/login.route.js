"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = require("express");
const login_controller_1 = __importDefault(require("../controllers/login.controller"));
class LoginRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new login_controller_1.default();
    }
    addRoute(route = this.controller.route) {
        this.router.post(route, this.controller.logining);
        this.router.get(route, this.controller.validate);
    }
}
exports.default = LoginRoute;
