"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const colors_1 = __importDefault(require("colors"));
const node_process_1 = require("node:process");
const constants_1 = require("../utils/constants");
const connectDB = async () => {
    try {
        const { connection: { host, port }, } = await mongoose_1.default.connect(constants_1.MONGO_URI);
        const url = `${host}:${port}`;
        console.log(colors_1.default.yellow.bold(`MongoDB Conectado en ${url}`));
    }
    catch (error) {
        console.log(colors_1.default.red.bold(`Error al conectar a MongoDB, error: ${error}`));
        (0, node_process_1.exit)(1);
    }
};
exports.connectDB = connectDB;
//# sourceMappingURL=db.js.map