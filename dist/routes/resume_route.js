"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ResumeController_1 = require("../controllers/ResumeController");
const router = express_1.default.Router();
router
    .route("/")
    .get(ResumeController_1.getResume)
    .post(ResumeController_1.createResume);
router
    .route("/:id")
    .get(ResumeController_1.findResume)
    .put(ResumeController_1.updateResume)
    .delete(ResumeController_1.deleteResume);
exports.default = router;
//# sourceMappingURL=resume_route.js.map