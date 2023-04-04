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
const vehicle_service_1 = __importDefault(require("../services/vehicle.service"));
class VehicleController {
    constructor() {
        this._route = '/Vehicles';
        this.errorServer = 'Internal Server Error';
    }
    get route() {
        return this._route;
    }
    getAllVehicles(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Vehicles = yield vehicle_service_1.default.getAllVehicles();
                return res.status(200).json({ data: Vehicles });
            }
            catch (e) {
                return res.status(500).json({ error: this.errorServer });
            }
        });
    }
    getVehicle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const Vehicle = yield vehicle_service_1.default.getVehicle(Number(id));
                if (Vehicle !== null)
                    return res.status(200).json(Vehicle);
                return res.status(200).json({ message: 'Veículo não encontrado.' });
            }
            catch (e) {
                return res.status(500).json({ error: this.errorServer });
            }
        });
    }
    createVehicle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            try {
                const Vehicle = yield vehicle_service_1.default.createVehicle(body);
                return res.status(201).json({ message: 'Veículo cadastrado com sucesso!', Vehicle });
            }
            catch (e) {
                // console.log(e)
                return res.status(500).json({ error: this.errorServer });
            }
        });
    }
    updateVehicle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { body } = req;
            try {
                const Vehicle = yield vehicle_service_1.default.updateVehicle(Number(id), body);
                return res.status(200).json({ message: 'Veículo atualizado com sucesso!', Vehicle });
            }
            catch (e) {
                return res.status(500).json({ error: this.errorServer });
            }
        });
    }
    deleteVehicle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield vehicle_service_1.default.deleteVehicle(Number(id));
                return res.status(200).json({ message: 'Veículo deletado com sucesso!' });
            }
            catch (e) {
                return res.status(500).json({ error: this.errorServer });
            }
        });
    }
}
exports.default = VehicleController;
