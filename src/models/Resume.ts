import { Schema, model } from "mongoose";

const eduSchema = new Schema(
    {
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
    }
)
const empSchema = new Schema(
    {
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
    }
)
const skillSchema = new Schema(
    {
        skill: {
            type: String,
        },
        status: {
            type: String,
        },
    }
)
const languageScehma = new Schema(
    {
        language: {
            type: String,
        },
        level: {
            type: String,
        },
    }
)
const resumeSchema = new Schema(
    {
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
        education: [ eduSchema ],
        employment: [ empSchema ],
        skills: [ skillSchema ],
        languages: [ languageScehma ],
        profie: {
            type: String,
            default: ""
        },
    },
    {
        timestamps: true
    }
)
export default model("resume", resumeSchema)