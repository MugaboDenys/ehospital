import { Router } from "express";
import Authentication from "../controllers/authenticate.js";
import Users from "../controllers/users.js";
import medicalUnit from "../controllers/medicalUnit.js";

const { Login, Signup } = Authentication;
const { getUsers } = Users;
const { addDesc, addAccess, downloadCSV } = medicalUnit;

const router = Router();


router.get("/list-users", getUsers);
router.post("/signup", Signup);
router.post("/login", Login);
router.post("/addAccess", addAccess);
router.post("/AddDescriptionServlet", addDesc);
router.post("/downloadCSV", downloadCSV);

export default router;