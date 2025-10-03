"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.signRefreshToken = exports.signAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("./constants");
const signAccessToken = (user) => {
    return jsonwebtoken_1.default.sign(user, constants_1.ACCESS_TOKEN_SECRET, {
        expiresIn: constants_1.ACCESS_TOKEN_EXPIRES,
    });
};
exports.signAccessToken = signAccessToken;
const signRefreshToken = (user) => {
    return jsonwebtoken_1.default.sign(user, constants_1.REFRESH_TOKEN_SECRET, {
        expiresIn: constants_1.REFRESH_TOKEN_EXPIRES,
    });
};
exports.signRefreshToken = signRefreshToken;
const verifyRefreshToken = (token) => {
    return jsonwebtoken_1.default.verify(token, constants_1.REFRESH_TOKEN_SECRET);
};
exports.verifyRefreshToken = verifyRefreshToken;
//# sourceMappingURL=tokens.js.map