import express, { Request } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import resume_route from './routes/resume_route';
import multer, { FileFilterCallback } from 'multer';
import { v4 } from 'uuid';
import path from 'path';
import cors from 'cors';
import { rootDir } from "./utils";
const bodyParser = require('body-parser')
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.json());
app.use(cors());

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
