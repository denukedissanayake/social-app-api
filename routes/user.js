import Express from "express";
import { getUserById, updateUserById } from "../controllers/user.js";

const router = Express.Router();

router.get('/:userid', getUserById);
router.post('/:userid', updateUserById);

export default router;