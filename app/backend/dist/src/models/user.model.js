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
class UserModel {
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield connection_1.default.user.findMany({
                select: {
                    id: true,
                    name: true,
                    cpf: true,
                    email: true
                }
            });
        });
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield connection_1.default.user.findUnique({
                where: {
                    id
                },
                select: {
                    id: true,
                    name: true,
                    cpf: true,
                    email: true
                }
            });
        });
    }
    getUserEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield connection_1.default.user.findUnique({
                where: {
                    email
                },
                select: {
                    id: true,
                    name: true,
                    cpf: true,
                    email: true
                }
            });
        });
    }
    getUserCPF(cpf) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield connection_1.default.user.findUnique({
                where: {
                    cpf
                },
                select: {
                    id: true,
                    name: true,
                    cpf: true,
                    email: true,
                    password: true
                }
            });
        });
    }
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield connection_1.default.user.create({
                data: body,
                select: {
                    id: true,
                    email: true,
                    name: true,
                    cpf: true
                }
            });
        });
    }
    update(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield connection_1.default.user.update({
                where: { id },
                data: body,
                select: {
                    id: true,
                    email: true,
                    name: true,
                    cpf: true
                }
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.user.delete({
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
exports.default = UserModel;
