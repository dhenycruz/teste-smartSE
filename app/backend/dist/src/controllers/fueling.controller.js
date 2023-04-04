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
const fueling_service_1 = __importDefault(require("../services/fueling.service"));
class FuelingController {
    constructor() {
        this._route = '/fuelings';
        this.errorServer = 'Internal Server Error';
    }
    get route() {
        return this._route;
    }
    getAllFueling(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fueling = yield fueling_service_1.default.getAllFueling();
                return res.status(200).json({ data: fueling });
            }
            catch (e) {
                return res.status(500).json({ error: this.errorServer });
            }
        });
    }
    getFueling(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const fueling = yield fueling_service_1.default.getFueling(Number(id));
                return res.status(200).json(fueling);
            }
            catch (e) {
                return res.status(500).json({ error: this.errorServer });
            }
        });
    }
    createFueling(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            try {
                const fueling = yield fueling_service_1.default.createFueling(body);
                return res.status(201).json({ message: 'Abastecimento cadastrado com sucesso!', fueling });
            }
            catch (e) {
                return res.status(500).json({ error: this.errorServer });
            }
        });
    }
    updateFueling(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { body } = req;
            try {
                const fueling = yield fueling_service_1.default.updateFueling(Number(id), body);
                return res.status(200).json({ message: 'Abastecimento atualizado com sucesso!', fueling });
            }
            catch (e) {
                return res.status(500).json({ error: this.errorServer });
            }
        });
    }
    deleteFueliong(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield fueling_service_1.default.deleteFueling(Number(id));
                return res.status(200).json({ message: 'Abastecimento deletado com sucesso!' });
            }
            catch (e) {
                return res.status(500).json({ error: this.errorServer });
            }
        });
    }
}
exports.default = FuelingController;
