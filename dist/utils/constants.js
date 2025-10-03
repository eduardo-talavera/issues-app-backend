"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGO_URI = exports.REFRESH_TOKEN_EXPIRES = exports.ACCESS_TOKEN_EXPIRES = exports.REFRESH_TOKEN_SECRET = exports.ACCESS_TOKEN_SECRET = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
_a = process.env, exports.ACCESS_TOKEN_SECRET = _a.ACCESS_TOKEN_SECRET, exports.REFRESH_TOKEN_SECRET = _a.REFRESH_TOKEN_SECRET, _b = _a.ACCESS_TOKEN_EXPIRES, exports.ACCESS_TOKEN_EXPIRES = _b === void 0 ? '15m' : _b, _c = _a.REFRESH_TOKEN_EXPIRES, exports.REFRESH_TOKEN_EXPIRES = _c === void 0 ? '7d' : _c, exports.MONGO_URI = _a.MONGO_URI;
//# sourceMappingURL=constants.js.map