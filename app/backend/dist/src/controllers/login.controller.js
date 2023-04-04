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
Object.defineProperty(exports, "__esModule", { value: true });
const login_service_1 = require("../services/login.service");
class Login {
    constructor() {
        this._route = '/login';
        this.errorServer = 'Internal  Server Error';
    }
    get route() {
        return this._route;
    }
    logining(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cpf, password } = req.body;
            const result = yield (0, login_service_1.logining)(cpf, password);
            if (result === false)
                return res.status(401).json({ message: 'cpf ou senha incorretas' });
            return res.status(200).json(result);
        });
    }
    validate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { authorization } = req.headers;
            if (authorization === undefined)
                return res.status(401).json({ message: 'Not authorized' });
            const result = yield (0, login_service_1.validateLogin)(authorization);
            if (result === false)
                return res.status(401).json({ auth: false, message: 'Not authorization!' });
            return res.status(201).json(result);
        });
    }
}
exports.default = Login;
