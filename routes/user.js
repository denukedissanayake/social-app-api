import Express from "express";
import { getUserById, updateUserById } from "../controllers/user.js";

const router = Express.Router();

router.get('/:userid', getUserById);
router.put('/', updateUserById);

export default router;