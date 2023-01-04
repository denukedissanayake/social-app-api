import Express from "express";
import userRouter from "./routes/user.js";
import postRouter from "./routes/post.js";
import likeRouter from "./routes/like.js";
import commentRouter from "./routes/comment.js";
import authRouter from "./routes/auth.js";

const app = Express();
const PORT = 3005;

app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/like", likeRouter);
app.use("/api/comment", commentRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, () => console.log(`App is listning to PORT ${PORT}`));