"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteResume = exports.updateResume = exports.findResume = exports.createResume = exports.getResume = void 0;
const ResumeService_1 = require("../services/ResumeService");
const getResume = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, ResumeService_1.getResumeService)(req, res, next);
});
exports.getResume = getResume;
const createResume = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, ResumeService_1.createResumeService)(req, res, next);
});
exports.createResume = createResume;
const findResume = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, ResumeService_1.findResumeService)(req, res, next);
});
exports.findResume = findResume;
const updateResume = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, ResumeService_1.updateResumeService)(req, res, next);
});
exports.updateResume = updateResume;
const deleteResume = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, ResumeService_1.deleteResumeService)(req, res, next);
});
exports.deleteResume = deleteResume;
//# sourceMappingURL=ResumeController.js.map