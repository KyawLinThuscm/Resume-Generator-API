import { Schema, model } from "mongoose";

const eduSchema = new Schema(
    {
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
    }
)
const empSchema = new Schema(
    {
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
    }
)
const skillSchema = new Schema(
    {
        skill: {
            type: String,
            default: ""
        },
        status: {
            type: String,
            default: ""
        },
    }
)
const languageScehma = new Schema(
    {
        language: {
            type: String,
            default: ""
        },
        level: {
            type: String,
            default: ""
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
        education: [ eduSchema ],
        employment: [ empSchema ],
        skills: [ skillSchema ],
        languages: [ languageScehma ],
        profile: {
            type: String,
            default: ""
        },
        deleted_at: {
            type: Date
        },
    },
    {
        timestamps: true
    }
)
export default model("resume", resumeSchema)