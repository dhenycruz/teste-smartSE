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
exports.verifyExistsUser = exports.verifyExistsUserCPF = exports.verifyExistsUserEmail = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const model = new user_model_1.default();
const verifyExistsUserEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const user = yield model.getUserEmail(email);
    if (user !== null)
        return res.status(409).json({ error: 'Email já cadastrado.' });
    next();
});
exports.verifyExistsUserEmail = verifyExistsUserEmail;
const verifyExistsUserCPF = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { cpf } = req.body;
    const user = yield model.getUserCPF(cpf);
    if (user !== null)
        return res.status(409).json({ error: 'CPF já cadastrado.' });
    next();
});
exports.verifyExistsUserCPF = verifyExistsUserCPF;
const verifyExistsUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield model.getUser(Number(id));
    if (user === null)
        return res.status(404).json({ error: 'Usuário não encontrado.' });
    next();
});
exports.verifyExistsUser = verifyExistsUser;
