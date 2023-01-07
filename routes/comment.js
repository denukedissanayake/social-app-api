import Express from "express";
import { getCommentsByPostId } from "../controllers/comment.js";

const router = Express.Router();

router.get('/:postid', getCommentsByPostId);


export default router;