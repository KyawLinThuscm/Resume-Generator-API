"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const eduSchema = new mongoose_1.Schema({
    education: {
        type: String,
        required: true,
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
        required: true,
    },
    status: {
        type: String,
        default: "Normal"
    },
});
const languageScehma = new mongoose_1.Schema({
    language: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        default: "Normal"
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
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        default: "Male"
    },
    nationality: {
        type: String,
        required: true,
    },
    religion: {
        type: String,
        required: true,
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
        required: true,
    },
    deleted_at: {
        type: Date
    },
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)("resume", resumeSchema);
//# sourceMappingURL=Resume.js.map