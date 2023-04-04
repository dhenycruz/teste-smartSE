"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vehicle_model_1 = __importDefault(require("../models/vehicle.model"));
class VehicleService {
    constructor() {
        this.model = new vehicle_model_1.default();
    }
    getAllVehicles() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.getAllVehicles();
        });
    }
    getVehicle(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.getVehicle(id);
        });
    }
    createVehicle(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.create(body);
        });
    }
    updateVehicle(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.update(id, body);
        });
    }
    deleteVehicle(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.delete(id);
        });
    }
}
exports.default = new VehicleService();
