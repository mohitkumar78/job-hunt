import express from "express"
import { CreateJob, getAllJob, getJobById, adminjobs } from "../Controler/Job.js"
import { isAuthenticated } from "../Middleware/isAuthenticated.js";

const router = express.Router();

router.route("/createjob").post(isAuthenticated, CreateJob);
router.route("/getalljob").post(isAuthenticated, getAllJob);
router.route("/getJobAdmin").get(isAuthenticated, adminjobs);
router.route("/getjobById").post(isAuthenticated, getJobById);


export default router;