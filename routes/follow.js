import Express from "express";
import {  getFollowedUsers, followUser, unfollowUser } from "../controllers/follow.js";

const router = Express.Router();

router.get('/', getFollowedUsers);
router.post('/', followUser);
router.delete('/', unfollowUser);

export default router;