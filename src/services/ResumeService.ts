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
        const resumePerPage: any = req.query.rpp || 5;

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
    next: NextFunction
) => {
    try {
        let profile: string = req.body.profile;
        if (req.file) {
            profile = req.file.path.replace("\\", "/");
        }

        const resumeForm: ResumeCreate = {
            personal: JSON.parse(req.body.personal),
            education: JSON.parse(req.body?.education) ||  [],
            employment: JSON.parse(req.body?.employment) || [],
            skills: JSON.parse(req.body?.skills) || [],
            languages: JSON.parse(req.body?.languages) || [],
            profile: profile
        }
        const resume = new Resume(resumeForm);
        const result = await resume.save();
        res
            .status(201)
            .json({ message: "Created Successfully!", data:result, status: 1 });

    } catch (err) {
        // res.send("An error occured");
        next(err);
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
        resume.personal = JSON.parse(req.body.personal);
        resume.education = JSON.parse(req.body?.education) ||  [];
        resume.employment = JSON.parse(req.body?.employment) || [];
        resume.skills = JSON.parse(req.body?.skills) || [];
        resume.languages = JSON.parse(req.body?.languages) || [];
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
    req: any,
    res: Response,
    _next: NextFunction
) => {
    try {
        const page: any = req.query.page || 0;
        const resumePerPage: any = req.query.rpp || 3;
        let condition: any = { deleted_at: null };

        req.body?.name ? condition = { 'personal.name' : { '$regex': req.body.name, '$options': 'i' }, deleted_at: null } : '';
        let fromDate = req.body?.fromDate ? new Date(req.body.fromDate) : null;
        let toDate = req.body?.toDate ? new Date(req.body.toDate) : null;
        
        !req.body?.name && !req.body?.fromDate && !req.body?.toDate ? condition : '';
        req.body?.fromDate && req.body?.toDate ? condition.createdAt = { $gte: fromDate, $lte: toDate } : '';
        req.body?.fromDate && !req.body?.toDate ? condition.createdAt = { $gte: fromDate, $lte: new Date() } : '';
        req.body?.toDate && !req.body?.fromDate ? condition.createdAt = { $lte: toDate } : '';
        req.body?.fromDate && req.body?.toDate && req.body?.fromDate === req.body?.toDate ?
        condition.createdAt = { $gte: moment(fromDate), $lte: moment(toDate).add(1, 'days') } : '';

        console.log(condition)
        const resume = await Resume.find(condition).skip(page * resumePerPage).limit(resumePerPage);
        res.json({ data: resume, status: 1 });
    } catch (err) {
        // next(err);
        res.send("An error occured");
    }
};
