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
const bcryptjs_1 = require("bcryptjs");
const user_model_1 = __importDefault(require("../models/user.model"));
class UserService {
    constructor() {
        this.model = new user_model_1.default();
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.getAllUsers();
        });
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.getUser(id);
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.delete(id);
        });
    }
    createUser(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, cpf, email, password } = body;
            const salt = yield (0, bcryptjs_1.genSalt)(10);
            const newPassword = yield (0, bcryptjs_1.hash)(password, salt);
            return yield this.model.create({
                name,
                cpf,
                email,
                password: newPassword
            });
        });
    }
    updateUser(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.update(id, body);
        });
    }
}
exports.default = new UserService();
