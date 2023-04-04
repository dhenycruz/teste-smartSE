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
const connection_1 = __importDefault(require("../../prisma/connection"));
class vehicleModel {
    getVehicleChassi(chassi) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield connection_1.default.vehicle.findUnique({
                where: {
                    chassi
                },
                select: {
                    id: true,
                    cor: true,
                    potencia: true,
                    motor: true,
                    placa: true,
                    localizacao: true,
                    modelo: true,
                    anoFabricacao: true,
                    anoModelo: true,
                    marca: true,
                    renavan: true,
                    chassi: true,
                    image: true,
                    userId: true
                }
            });
        });
    }
    getVehicleRenavan(renavan) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield connection_1.default.vehicle.findUnique({
                where: {
                    renavan
                },
                select: {
                    id: true,
                    cor: true,
                    potencia: true,
                    motor: true,
                    placa: true,
                    localizacao: true,
                    modelo: true,
                    anoFabricacao: true,
                    anoModelo: true,
                    marca: true,
                    renavan: true,
                    chassi: true,
                    image: true,
                    userId: true
                }
            });
        });
    }
    getAllVehicles() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield connection_1.default.vehicle.findMany({
                select: {
                    id: true,
                    cor: true,
                    potencia: true,
                    motor: true,
                    placa: true,
                    localizacao: true,
                    modelo: true,
                    anoFabricacao: true,
                    anoModelo: true,
                    marca: true,
                    renavan: true,
                    chassi: true,
                    image: true,
                    userId: true,
                    Fuelings: {
                        select: {
                            id: true,
                            type_fuel: true,
                            value: true,
                            quantity_fueled: true,
                            dateFueled: true,
                            carId: true
                        }
                    }
                }
            });
        });
    }
    getVehicle(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield connection_1.default.vehicle.findUnique({
                where: {
                    id
                },
                select: {
                    id: true,
                    cor: true,
                    potencia: true,
                    motor: true,
                    placa: true,
                    localizacao: true,
                    modelo: true,
                    anoFabricacao: true,
                    anoModelo: true,
                    marca: true,
                    renavan: true,
                    chassi: true,
                    image: true,
                    userId: true,
                    Fuelings: {
                        select: {
                            id: true,
                            type_fuel: true,
                            value: true,
                            quantity_fueled: true,
                            dateFueled: true,
                            carId: true
                        }
                    }
                }
            });
        });
    }
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield connection_1.default.vehicle.create({
                data: body,
                select: {
                    id: true,
                    cor: true,
                    potencia: true,
                    motor: true,
                    placa: true,
                    localizacao: true,
                    modelo: true,
                    anoFabricacao: true,
                    anoModelo: true,
                    marca: true,
                    renavan: true,
                    chassi: true,
                    image: true,
                    userId: true
                }
            });
        });
    }
    update(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield connection_1.default.vehicle.update({
                where: { id },
                data: body,
                select: {
                    id: true,
                    cor: true,
                    potencia: true,
                    motor: true,
                    placa: true,
                    localizacao: true,
                    modelo: true,
                    anoFabricacao: true,
                    anoModelo: true,
                    marca: true,
                    renavan: true,
                    chassi: true,
                    image: true,
                    userId: true
                }
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.vehicle.delete({
                    where: { id }
                });
                return true;
            }
            catch (_e) {
                return false;
            }
        });
    }
}
exports.default = vehicleModel;
