import Express from "express";
import { getCommentsByPostId, addComments } from "../controllers/comment.js";

const router = Express.Router();

router.get('/:postid', getCommentsByPostId);
router.post('/', addComments);


export default router;