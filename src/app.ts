import express, { Request } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import resume_route from './routes/resume_route';
import multer, { FileFilterCallback } from 'multer';
import { v4 } from 'uuid';
import path from 'path';
import { rootDir } from "./utils";
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

//file upload
const fileStorage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, "apiuploads");
    },
    filename: (_req, file, cb) => {
        cb(null, `${v4()}_${file.originalname}`);
    },
});

const fileFilter = (_req: Request, file: any, cb: FileFilterCallback) => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
app.use(multer({ storage: fileStorage, fileFilter }).single('profile'));
app.use("/apiuploads", express.static(path.join(rootDir, "apiuploads")));

app.get('/', (_req, res) => {
    res.json({ message: "Helo World" })
})

mongoose.connect(process.env.DATABASE || "").then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    app.use('/api/resume/', resume_route);
});
