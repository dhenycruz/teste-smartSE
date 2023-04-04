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
exports.verifyExistsVechicle = exports.verifyExistsVechicleRenavan = exports.verifyExistsVechicleChassi = void 0;
const vehicle_model_1 = __importDefault(require("../models/vehicle.model"));
const model = new vehicle_model_1.default();
const verifyExistsVechicleChassi = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { chassi } = req.body;
    const car = yield model.getVehicleChassi(chassi);
    if (car !== null)
        return res.status(409).json({ error: 'Chassi já cadastrado' });
    next();
});
exports.verifyExistsVechicleChassi = verifyExistsVechicleChassi;
const verifyExistsVechicleRenavan = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { renavan } = req.body;
    const car = yield model.getVehicleRenavan(renavan);
    if (car !== null)
        return res.status(409).json({ error: 'Renavan já cadastrado' });
    next();
});
exports.verifyExistsVechicleRenavan = verifyExistsVechicleRenavan;
const verifyExistsVechicle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const car = yield model.getVehicle(Number(id));
    if (car === null)
        return res.status(404).json({ error: 'Carro não encontrado.' });
    next();
});
exports.verifyExistsVechicle = verifyExistsVechicle;
