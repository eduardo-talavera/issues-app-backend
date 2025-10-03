"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const User_1 = require("../models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const tokens_1 = require("../utils/tokens");
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
};
class AuthController {
    static register = async (req, res) => {
        const { email, password, name } = req.body;
        try {
            const existing = await User_1.User.findOne({ email });
            if (existing) {
                res
                    .status(409)
                    .json({
                    message: 'Ya existe un usuario asociado con estas credenciales',
                });
                return;
            }
            const hashed = await bcrypt_1.default.hash(password, 10);
            const user = new User_1.User({ email, password: hashed, name });
            await user.save();
            res.status(201).json({ message: 'Usuario creado exitosamente' });
        }
        catch (error) {
            res.status(500).json({ message: 'Error al registrar usuario' });
        }
    };
    static login = async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await User_1.User.findOne({ email });
            if (!user) {
                res.status(404).json({ message: 'Usuario no encontrado' });
                return;
            }
            const isValidPassword = await bcrypt_1.default.compare(password, user.password);
            if (!isValidPassword) {
                res.status(401).json({ message: 'Credenciales invalidas' });
                return;
            }
            const payload = {
                id: user._id.toString(),
                email: user.email,
                name: user.name,
            };
            const accessToken = (0, tokens_1.signAccessToken)(payload);
            const refreshToken = (0, tokens_1.signRefreshToken)(payload);
            // Save refresh token in DB (simple approach)
            user.refreshTokens.push({ token: refreshToken });
            await user.save();
            res.cookie('refreshToken', refreshToken, cookieOptions);
            res.json({ accessToken });
        }
        catch (error) {
            res.status(500).json({ message: 'Error al iniciar sesión' });
        }
    };
    static refreshToken = async (req, res) => {
        const token = req.cookies?.refreshToken;
        if (!token) {
            res.status(401).json({ message: 'No se encontro el refresh token' });
            return;
        }
        try {
            const payload = (0, tokens_1.verifyRefreshToken)(token);
            const user = await User_1.User.findById(payload.id);
            if (!user) {
                res.status(401).json({ message: 'Usuario no encontrado' });
                return;
            }
            const found = user.refreshTokens.find((rt) => rt.token === token);
            if (!found) {
                res.status(401).json({ message: 'Refresh token revocado' });
                return;
            }
            const accessToken = (0, tokens_1.signAccessToken)({
                id: user._id.toString(),
                email: user.email,
                name: user.name,
            });
            res.json({ accessToken });
        }
        catch (err) {
            res.status(401).json({ message: 'Invalid refresh token' });
        }
    };
    static logout = async (req, res) => {
        const token = req.cookies?.refreshToken;
        if (token) {
            try {
                const payload = (0, tokens_1.verifyRefreshToken)(token);
                const user = await User_1.User.findById(payload.id);
                if (user) {
                    user.refreshTokens = user.refreshTokens.filter((rt) => rt.token !== token);
                    await user.save();
                }
            }
            catch (e) {
                console.log(`Error al cerrar sesión: ${e}`);
            }
        }
        res.clearCookie('refreshToken', cookieOptions);
        res.json({ message: 'Se cerro la sesión exitosamente' });
    };
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map