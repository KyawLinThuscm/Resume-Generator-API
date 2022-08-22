import express from 'express';
import { createResume, findResume, getResume, updateResume, deleteResume, searchResume } from '../controllers/ResumeController';

const router = express.Router();


router
    .route("/")
    .get(getResume)
    .post(createResume)

router
    .route("/:id")
    .get(findResume)
    .put(updateResume)
    .delete(deleteResume)

router
    .route("/search")
    .post(searchResume)
export default router;