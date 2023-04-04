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
exports.authToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_model_1 = __importDefault(require("../models/user.model"));
dotenv_1.default.config();
const model = new user_model_1.default();
const createToken = (user) => {
    const secret = process.env.SECRET_KEY;
    if (secret !== undefined) {
        const token = jsonwebtoken_1.default.sign({ data: user }, secret, { expiresIn: '2h', algorithm: 'HS256' });
        return token;
    }
    return false;
};
exports.createToken = createToken;
const authToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const secret = process.env.SECRET_KEY;
    try {
        if (secret !== undefined) {
            const decodec = jsonwebtoken_1.default.verify(token, secret);
            const user = yield model.getUserCPF(decodec.data.cpf);
            if (user === null)
                return false;
            return {
                auth: true,
                user: decodec.data
            };
        }
        return false;
    }
    catch (e) {
        console.log(e);
        return false;
    }
});
exports.authToken = authToken;
