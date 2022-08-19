"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const eduSchema = new mongoose_1.Schema({
    education: {
        type: String,
        required: true
    },
    school: {
        type: String,
    },
    startdate: {
        type: Date,
    },
    enddate: {
        type: Date,
    },
    description: {
        type: String,
        default: ""
    },
});
const empSchema = new mongoose_1.Schema({
    position: {
        type: String,
    },
    company: {
        type: String,
    },
    startdate: {
        type: Date,
    },
    enddate: {
        type: Date,
    },
    description: {
        type: String,
        default: ""
    },
});
const skillSchema = new mongoose_1.Schema({
    skill: {
        type: String,
    },
    status: {
        type: String,
    },
});
const languageScehma = new mongoose_1.Schema({
    language: {
        type: String,
    },
    level: {
        type: String,
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
        enum: ['Male', 'Female']
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
    profie: {
        type: String,
        default: ""
    },
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)("resume", resumeSchema);
//# sourceMappingURL=Resume.js.map