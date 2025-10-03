"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const cors_2 = require("./config/cors");
const db_1 = require("./config/db");
const IssuesRoutes_1 = __importDefault(require("./routes/IssuesRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
dotenv_1.default.config();
(0, db_1.connectDB)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)(cors_2.corsConfig));
// Leer datos de formulario
app.use(express_1.default.json());
// Loggin
app.use((0, morgan_1.default)('dev'));
// Routes
app.use('/auth', authRoutes_1.default);
app.use('/issues', IssuesRoutes_1.default);
exports.default = app;
//# sourceMappingURL=server.js.map