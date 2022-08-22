import { Request, Response, NextFunction } from 'express'
import {
    getResumeService,
    createResumeService,
    findResumeService,
    updateResumeService,
    deleteResumeService,
    searchResumeService
} from '../services/ResumeService'

export const getResume = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    getResumeService(req, res, next);
  };
  
  export const createResume = async (
    req: any,
    res: Response,
    next: NextFunction
  ) => {
    createResumeService(req, res, next);
  }
  
  export const findResume = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    findResumeService(req, res, next);
  }
  
  export const updateResume = async (
    req: any,
    res: Response,
    next: NextFunction
  ) => {
    updateResumeService(req, res, next);
  };
  
  export const deleteResume = async (
    req: any,
    res: Response,
    next: NextFunction
  ) => {
    deleteResumeService(req, res, next);
  };

  export const searchResume = async (
    req: any,
    res: Response,
    next: NextFunction
  ) => {
    searchResumeService(req, res, next);
  }