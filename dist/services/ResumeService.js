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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteResumeService = exports.updateResumeService = exports.findResumeService = exports.createResumeService = exports.getResumeService = void 0;
const Resume_1 = __importDefault(require("../models/Resume"));
const getResumeService = (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let condition = { deleted_at: null };
        const resume = yield Resume_1.default.find(condition);
        res.json({ data: resume, status: 1 });
    }
    catch (err) {
        res.send("An error occured");
    }
});
exports.getResumeService = getResumeService;
const createResumeService = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resumeForm = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            dob: req.body.dob,
            gender: req.body.gender,
            nationality: req.body.nationality,
            religion: req.body.religion,
            description: req.body.description,
            education: req.body.education,
            employment: req.body.employment,
            skills: req.body.skills,
            languages: req.body.languages,
            profile: req.body.profile
        };
        const resume = new Resume_1.default(resumeForm);
        const result = yield resume.save();
        res
            .status(201)
            .json({ message: "Created Successfully!", data: result, status: 1 });
    }
    catch (err) {
        res
            .status(404)
            .json({ message: "Created Failed!" });
    }
});
exports.createResumeService = createResumeService;
const findResumeService = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resume = yield Resume_1.default.findById(req.params.id);
        res.json({ data: resume, status: 1 });
    }
    catch (err) {
        res.send("An error occured");
    }
});
exports.findResumeService = findResumeService;
const updateResumeService = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resume = yield Resume_1.default.findById(req.params.id);
        if (!resume) {
            const error = new Error("Not Found!");
            error.statusCode = 404;
            throw error;
        }
        resume.name = req.body.name;
        resume.email = req.body.email;
        resume.phone = req.body.phone;
        resume.address = req.body.address;
        resume.dob = req.body.dob;
        resume.gender = req.body.gender;
        resume.nationality = req.body.nationality;
        resume.religion = req.body.religion;
        resume.description = req.body.description;
        resume.education = req.body.education;
        resume.employment = req.body.employment;
        resume.skills = req.body.skills;
        resume.languages = req.body.languages;
        resume.profile = req.body.profile;
        const result = yield resume.save();
        res.json({ message: "Updated Successfully!", data: result, status: 1 });
    }
    catch (err) {
        res.send("An error occured");
    }
});
exports.updateResumeService = updateResumeService;
const deleteResumeService = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resume = yield Resume_1.default.findById(req.params.id);
        if (!resume) {
            const error = new Error("Not Found!");
            error.statusCode = 404;
            throw error;
        }
        resume.deleted_at = new Date();
        yield resume.save();
        res.sendStatus(204);
    }
    catch (err) {
        res.send("An error occured");
    }
});
exports.deleteResumeService = deleteResumeService;
//# sourceMappingURL=ResumeService.js.map