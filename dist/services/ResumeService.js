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
exports.searchResumeService = exports.deleteResumeService = exports.updateResumeService = exports.findResumeService = exports.createResumeService = exports.getResumeService = void 0;
const Resume_1 = __importDefault(require("../models/Resume"));
const utils_1 = require("../utils");
const moment_1 = __importDefault(require("moment"));
const express_validator_1 = require("express-validator");
const getResumeService = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = req.query.page || 0;
        const resumePerPage = req.query.rpp || 3;
        let condition = { deleted_at: null };
        const resume = yield Resume_1.default.find(condition).skip(page * resumePerPage).limit(resumePerPage);
        res.json({ data: resume, status: 1 });
    }
    catch (err) {
        res.send("An error occured");
    }
});
exports.getResumeService = getResumeService;
const createResumeService = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let profile = req.body.profile;
        if (req.file) {
            profile = req.file.path.replace("\\", "/");
        }
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
            profile: profile
        };
        const resume = new Resume_1.default(resumeForm);
        const result = yield resume.save();
        res
            .status(201)
            .json({ message: "Created Successfully!", data: result, status: 1 });
    }
    catch (err) {
        res.send("An error occured");
    }
});
exports.createResumeService = createResumeService;
const findResumeService = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resume = yield Resume_1.default.findById(req.params.id);
        if (!resume) {
            const error = Error("Not Found!");
            error.statusCode = 404;
            throw error;
        }
        res.json({ data: resume, status: 1 });
    }
    catch (err) {
        res.send("An error occured");
    }
});
exports.findResumeService = findResumeService;
const updateResumeService = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req.body);
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed!");
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
        }
        const resume = yield Resume_1.default.findById(req.params.id);
        if (!resume) {
            const error = new Error("Not Found!");
            error.statusCode = 404;
            throw error;
        }
        let profile = req.body.profile;
        if (req.file) {
            profile = req.file.path.replace("\\", "/");
            if (resume.profile && resume.profile != profile) {
                (0, utils_1.deleteFile)(resume.profile);
            }
            if (profile) {
                resume.profile = profile;
            }
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
const searchResumeService = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    try {
        const page = req.query.page || 0;
        const resumePerPage = req.query.rpp || 3;
        let condition = { deleted_at: null };
        let fromDate = ((_a = req.body) === null || _a === void 0 ? void 0 : _a.fromDate) ? new Date(req.body.fromDate) : null;
        let toDate = ((_b = req.body) === null || _b === void 0 ? void 0 : _b.toDate) ? new Date(req.body.toDate) : null;
        ((_c = req.body) === null || _c === void 0 ? void 0 : _c.rname) ? condition.name = { '$regex': req.body.rname, '$options': 'i' } : '';
        ((_d = req.body) === null || _d === void 0 ? void 0 : _d.fromDate) && ((_e = req.body) === null || _e === void 0 ? void 0 : _e.toDate) ? condition.createdAt = { $gte: fromDate, $lte: toDate } : '';
        ((_f = req.body) === null || _f === void 0 ? void 0 : _f.fromDate) && !((_g = req.body) === null || _g === void 0 ? void 0 : _g.toDate) ? condition.createdAt = { $gte: fromDate, $lte: new Date() } : '';
        ((_h = req.body) === null || _h === void 0 ? void 0 : _h.toDate) && !((_j = req.body) === null || _j === void 0 ? void 0 : _j.fromDate) ? condition.createdAt = { $lte: toDate } : '';
        ((_k = req.body) === null || _k === void 0 ? void 0 : _k.fromDate) && ((_l = req.body) === null || _l === void 0 ? void 0 : _l.toDate) && ((_m = req.body) === null || _m === void 0 ? void 0 : _m.fromDate) === ((_o = req.body) === null || _o === void 0 ? void 0 : _o.toDate) ?
            condition.createdAt = { $gte: (0, moment_1.default)(fromDate), $lte: (0, moment_1.default)(toDate).add(1, 'days') } : '';
        const resume = yield Resume_1.default.find(condition).skip(page * resumePerPage).limit(resumePerPage);
        res.json({ data: resume, status: 1 });
    }
    catch (err) {
        res.send("An error occured");
    }
});
exports.searchResumeService = searchResumeService;
//# sourceMappingURL=ResumeService.js.map