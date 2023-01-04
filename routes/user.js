import Express from "express";
import { getUserById } from "../controllers/user.js";

const router = Express.Router();

router.get('/:userid', getUserById);


export default router;