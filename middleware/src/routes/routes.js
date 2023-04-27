import { Router } from "express";
import Authentication from "../controllers/auth.js";
import Medicalcontrollers from "../controllers/index.js";
import Users from "../controllers/users.js";

const { FetchData } = Medicalcontrollers;
const { Login, Signup } = Authentication;
const { getUser, getUsers } = Users;

const router = Router();


router.get("/list-users", getUsers);
router.post("/signup", Signup);
router.post("/login", Login);

export default router;