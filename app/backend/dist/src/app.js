"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    startServer(PORT = 3001) {
        this.app.listen(PORT, () => {
            console.log(`Server running in the port ${PORT}`);
        });
    }
    addRouter(router) {
        this.app.use(router);
    }
    getApp() {
        return this.app;
    }
}
exports.default = new App();
