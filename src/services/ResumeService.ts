import { Request, Response, NextFunction } from 'express'
import Resume from '../models/Resume';
import { ResumeCreate } from '../interfaces/ResumeInterface';
import { deleteFile } from "../utils";
import moment from 'moment';
import { validationResult } from "express-validator";

export const getResumeService = async (
    req: Request,
    res: Response,
    _next: NextFunction
) => {
    try {
        const page: any = req.query.page || 0;
        const resumePerPage: any = req.query.rpp || 3;

        let condition: any = { deleted_at: null };
        const resume = await Resume.find(condition).skip(page * resumePerPage).limit(resumePerPage);
        res.json({ data: resume, status: 1 });
    } catch (err) {
        res.send("An error occured");
    }
};

export const createResumeService = async (
    req: any,
    res: Response,
    _next: NextFunction
) => {
    try {
        let profile: string = req.body.profile;
        if (req.file) {
            profile = req.file.path.replace("\\", "/");
        }
        const resumeForm: ResumeCreate = {
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
        }
        const resume = new Resume(resumeForm);
        const result = await resume.save();
        res
            .status(201)
            .json({ message: "Created Successfully!", data: result, status: 1 });

    } catch (err) {
        res.send("An error occured");
    }
};

export const findResumeService = async (
    req: Request,
    res: Response,
    _next: NextFunction
) => {
    try {
        const resume = await Resume.findById(req.params.id);
        if (!resume) {
            const error: any = Error("Not Found!");
            error.statusCode = 404;
            throw error;
          }
        res.json({ data: resume, status: 1 });
    } catch (err) {
        res.send("An error occured");
    }
};

export const updateResumeService = async (
    req: any,
    res: Response,
    _next: NextFunction
) => {
    try {
        const errors = validationResult(req.body);
        if (!errors.isEmpty()) {
            const error: any = new Error("Validation failed!");
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
        }
        const resume = await Resume.findById(req.params.id);
        if (!resume) {
            const error: any = new Error("Not Found!");
            error.statusCode = 404;
            throw error;
        }
        let profile: string = req.body.profile;
        if (req.file) {
        profile = req.file.path.replace("\\", "/");
        if (resume.profile && resume.profile != profile) {
            deleteFile(resume.profile);
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
        const result = await resume.save();
        res.json({ message: "Updated Successfully!", data: result, status: 1 });
    } catch (err) {
        res.send("An error occured");
    }
};

export const deleteResumeService = async (
    req: any,
    res: Response,
    _next: NextFunction
) => {
    try {
        const resume = await Resume.findById(req.params.id);
        if (!resume) {
            const error: any = new Error("Not Found!");
            error.statusCode = 404;
            throw error;
        }
        resume.deleted_at = new Date();
        await resume.save();
        res.sendStatus(204)
    } catch (err) {
        res.send("An error occured");
    }
};

export const searchResumeService = async (
    req: Request,
    res: Response,
    _next: NextFunction
) => {
    try {
        const page: any = req.query.page || 0;
        const resumePerPage: any = req.query.rpp || 3;
        let condition: any = { deleted_at: null };

        let fromDate = req.body?.fromDate ? new Date(req.body.fromDate) : null;
        let toDate = req.body?.toDate ? new Date(req.body.toDate) : null;
        req.body?.rname ? condition.name = { '$regex': req.body.rname, '$options': 'i' } : '';
        req.body?.fromDate && req.body?.toDate ? condition.createdAt = { $gte: fromDate, $lte: toDate } : '';
        req.body?.fromDate && !req.body?.toDate ? condition.createdAt = { $gte: fromDate, $lte: new Date() } : '';
        req.body?.toDate && !req.body?.fromDate ? condition.createdAt = { $lte: toDate } : '';
        req.body?.fromDate && req.body?.toDate && req.body?.fromDate === req.body?.toDate ?
        condition.createdAt = { $gte: moment(fromDate), $lte: moment(toDate).add(1, 'days') } : '';

        const resume = await Resume.find(condition).skip(page * resumePerPage).limit(resumePerPage);
        res.json({ data: resume, status: 1 });
    } catch (err) {
        res.send("An error occured");
    }
};
