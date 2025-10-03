"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../controllers/AuthController");
const express_validator_1 = require("express-validator");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
router.post('/register', (0, express_validator_1.body)('email')
    .notEmpty()
    .withMessage('El campo email es obligatorio')
    .isEmail()
    .withMessage('El campo debe ser un email valido'), (0, express_validator_1.body)('password')
    .notEmpty()
    .withMessage('El campo password es obligatorio')
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener al menos 8 caracteres'), validation_1.handleInputErrors, AuthController_1.AuthController.register);
router.post('/login', (0, express_validator_1.body)('email')
    .notEmpty()
    .withMessage('El campo email es obligatorio')
    .isEmail()
    .withMessage('El campo debe ser un email valido'), (0, express_validator_1.body)('password')
    .notEmpty()
    .withMessage('El campo password es obligatorio')
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener al menos 8 caracteres'), validation_1.handleInputErrors, AuthController_1.AuthController.login);
router.post('/refresh', AuthController_1.AuthController.refreshToken);
router.post('/logout', AuthController_1.AuthController.logout);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map