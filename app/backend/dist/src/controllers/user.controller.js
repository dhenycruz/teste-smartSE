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
const user_service_1 = __importDefault(require("../services/user.service"));
class UserController {
    constructor() {
        this._route = '/users';
        this.errorServer = 'Internal Server Error';
    }
    get route() {
        return this._route;
    }
    getAllUser(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_service_1.default.getAllUsers();
                return res.status(200).json({ data: users });
            }
            catch (e) {
                return res.status(500).json({ error: this.errorServer });
            }
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const user = yield user_service_1.default.getUser(Number(id));
                if (user !== null) {
                    return res.status(200).json(user);
                }
                return res.status(200).json({ message: 'Usuário não encontrado.' });
            }
            catch (e) {
                return res.status(500).json({ error: this.errorServer });
            }
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            try {
                const user = yield user_service_1.default.createUser(body);
                return res.status(201).json({ message: 'Usuário cadastrado com sucesso!', user });
            }
            catch (e) {
                return res.status(500).json({ error: this.errorServer });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { body } = req;
            try {
                const user = yield user_service_1.default.updateUser(Number(id), body);
                return res.status(200).json({ message: 'Usuário atualizado com sucesso!', user });
            }
            catch (e) {
                return res.status(500).json({ error: this.errorServer });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield user_service_1.default.deleteUser(Number(id));
                return res.status(200).json({ message: 'Usuário deletado com sucesso!' });
            }
            catch (e) {
                return res.status(500).json({ error: this.errorServer });
            }
        });
    }
}
exports.default = UserController;
