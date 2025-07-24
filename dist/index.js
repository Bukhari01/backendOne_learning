"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./config/db"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Hello There! Welcome to backendOne');
});
const PORT = process.env.PORT || 5000;
(0, db_1.default)().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running on port: ${PORT}`);
    });
}).catch((error) => {
    console.error("failed to connect to database:", error);
});
exports.default = app;
