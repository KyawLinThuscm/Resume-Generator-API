import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import resume_route from './routes/resume_route';
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.get('/', (_req, res) => {
    res.json({ message: "Helo World"})
})

mongoose.connect(process.env.DATABASE || "").then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    app.use('/api/resume/', resume_route);
});
