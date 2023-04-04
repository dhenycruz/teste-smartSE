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
const fueling_model_1 = __importDefault(require("../models/fueling.model"));
class FuelingService {
    constructor() {
        this.model = new fueling_model_1.default();
    }
    getAllFueling() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.getAllFueling();
        });
    }
    getFueling(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.getFueling(id);
        });
    }
    createFueling(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.create(body);
        });
    }
    updateFueling(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.update(id, body);
        });
    }
    deleteFueling(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.delete(id);
        });
    }
}
exports.default = new FuelingService();
