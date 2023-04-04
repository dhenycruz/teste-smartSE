"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const verifyUser_1 = require("../middleware/verifyUser");
const verifyToken_1 = require("../middleware/verifyToken");
class UserRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new user_controller_1.default();
    }
    addRoute(route = this.controller.route) {
        this.router.get(route, verifyToken_1.verifyToken, this.controller.getAllUser);
        this.router.get(`${route}/:id`, verifyToken_1.verifyToken, this.controller.getUser);
        this.router.post(route, verifyToken_1.verifyToken, verifyUser_1.verifyExistsUserEmail, verifyUser_1.verifyExistsUserCPF, this.controller.createUser);
        this.router.put(`${route}/:id`, verifyToken_1.verifyToken, verifyUser_1.verifyExistsUser, this.controller.updateUser);
        this.router.delete(`${route}/:id`, verifyToken_1.verifyToken, verifyUser_1.verifyExistsUser, this.controller.deleteUser);
    }
}
exports.default = UserRouter;
