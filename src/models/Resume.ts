import { Schema, model } from "mongoose";

const eduSchema = new Schema(
    {
        education: {
            type: String,
            // required: true,
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
            // default: ""
        },
    }
)
const skillSchema = new Schema(
    {
        skill: {
            type: String,
            // required: true,
        },
        level: {
            type: String,
            default: "Normal"
        },
    }
)
const languageScehma = new Schema(
    {
        language: {
            type: String,
            // required: true,
        },
        level: {
            type: String,
            default: "Normal"
        },
    }
)

const personalSchema = new Schema(
    { 
        name: {
            type: String,
            // required: true,
        },
        email: {
            type: String,
            // required: true,
        },
        phone: {
            type: String,
            // required: true,
        },
        address: {
            type: String,
            // required: true,
        },
        dob: {
            type: Date,
            // required: true,
        },
        gender: {
            type: String,
            enum: ['Male', 'Female'],
            default: "Male"
        },
        nationality: {
            type: String,
            // required: true,
        },
        religion: {
            type: String,
            // required: true,
        },
        description: {
            type: String,
            default: ""
        }
    }  
)
const resumeSchema = new Schema(
    {
        personal: personalSchema,
        education: [ eduSchema ],
        employment: [ empSchema ],
        skills: [ skillSchema ],
        languages: [ languageScehma ],
        profile: {
            type: String,
            required: true,
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