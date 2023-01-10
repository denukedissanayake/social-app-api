import Express from "express";
import { getLikesByPostId, addLikesByPostId, deleteLikesByPostId } from "../controllers/like.js";

const router = Express.Router();

router.get('/:postid', getLikesByPostId);
router.post('/', addLikesByPostId);
router.delete('/', deleteLikesByPostId);


export default router;