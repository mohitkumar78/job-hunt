import express from 'express'
import { CreateApplication, getAppliedJob, getApplicants, updateSatus } from '../Controler/Application.js';
import { isAuthenticated } from '../Middleware/isAuthenticated.js';

const router = express.Router();

router.route("/apply/:id").post(isAuthenticated, CreateApplication);
router.route("/getAppliedJob").get(isAuthenticated, getAppliedJob);
router.route("/getApplicant/:id").get(isAuthenticated, getApplicants);
router.route("/update/:id").put(isAuthenticated, updateSatus);
export default router;