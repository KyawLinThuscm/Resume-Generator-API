"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const eduSchema = new mongoose_1.Schema({
    education: {
        type: String,
        default: ""
    },
    school: {
        type: String,
        default: ""
    },
    startdate: {
        type: Date,
        default: ""
    },
    enddate: {
        type: Date,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
});
const empSchema = new mongoose_1.Schema({
    position: {
        type: String,
        default: ""
    },
    company: {
        type: String,
        default: ""
    },
    startdate: {
        type: Date,
        default: ""
    },
    enddate: {
        type: Date,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
});
const skillSchema = new mongoose_1.Schema({
    skill: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        default: ""
    },
});
const languageScehma = new mongoose_1.Schema({
    language: {
        type: String,
        default: ""
    },
    level: {
        type: String,
        default: ""
    },
});
const resumeSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    dob: {
        type: Date,
        default: ""
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        default: "Male"
    },
    nationality: {
        type: String,
        default: ""
    },
    religion: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    education: [eduSchema],
    employment: [empSchema],
    skills: [skillSchema],
    languages: [languageScehma],
    profile: {
        type: String,
        default: ""
    },
    deleted_at: {
        type: Date
    },
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)("resume", resumeSchema);
//# sourceMappingURL=Resume.js.map