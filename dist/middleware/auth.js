"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../utils/constants");
const authenticateAccessToken = (req, res, next) => {
    const auth = req.headers['authorization'];
    if (!auth) {
        res
            .status(401)
            .json({ message: 'No se encontro token recurso no autorizado' });
        return;
    }
    const token = auth.split(' ')[1];
    if (!token) {
        res
            .status(401)
            .json({ message: 'No se encontro token recurso no autorizado' });
        return;
    }
    try {
        const { id, name, email } = jsonwebtoken_1.default.verify(token, constants_1.ACCESS_TOKEN_SECRET);
        req.user = { id, name, email };
        next();
    }
    catch (err) {
        res.status(401).json({ message: 'Token Invalido' });
        return;
    }
};
exports.authenticateAccessToken = authenticateAccessToken;
//# sourceMappingURL=auth.js.map