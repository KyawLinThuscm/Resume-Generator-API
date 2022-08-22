"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const resume_route_1 = __importDefault(require("./routes/resume_route"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', (_req, res) => {
    res.json({ message: "Helo World" });
});
mongoose_1.default.connect(process.env.DATABASE || "").then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    app.use('/api/resume/', resume_route_1.default);
});
//# sourceMappingURL=app.js.map