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
exports.validateLogin = exports.logining = void 0;
const bcryptjs_1 = require("bcryptjs");
const jwt_1 = require("../jwt");
const user_model_1 = __importDefault(require("../models/user.model"));
const model = new user_model_1.default();
const logining = (cpf, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield model.getUserCPF(cpf);
    const getPassword = ((user === null || user === void 0 ? void 0 : user.password) != null) ? user === null || user === void 0 ? void 0 : user.password : '';
    const verifyPassword = (0, bcryptjs_1.compareSync)(password, getPassword);
    if (!verifyPassword)
        return false;
    if (user !== null) {
        const token = (0, jwt_1.createToken)(user);
        delete user.password;
        if (token !== false) {
            return {
                user,
                token
            };
        }
    }
    return false;
});
exports.logining = logining;
const validateLogin = (token) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, jwt_1.authToken)(token);
});
exports.validateLogin = validateLogin;
