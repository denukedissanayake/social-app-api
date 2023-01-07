import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';

import userRouter from "./routes/user.js";
import postRouter from "./routes/post.js";
import likeRouter from "./routes/like.js";
import commentRouter from "./routes/comment.js";
import authRouter from "./routes/auth.js";
import { fileUpload } from "./controllers/upload.js";

const PORT = 3005;

const app = express();
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000"
}));


app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/like", likeRouter);
app.use("/api/comment", commentRouter);
app.use("/api/auth", authRouter);

app.use("/api/upload", fileUpload);

app.listen(PORT, () => console.log(`App is listning to PORT ${PORT}`));