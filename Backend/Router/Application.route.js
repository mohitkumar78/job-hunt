import express from 'express'
import { CreateApplication, getAppliedJob, getApplicants, updateSatus } from '../Controler/Application.js';
import { isAuthenticated } from '../Middleware/isAuthenticated.js';

const router = express.Router();

router.route("/apply").post(isAuthenticated, CreateApplication);
router.route("/getAppliedJob").post(isAuthenticated, getAppliedJob);
router.route("/getApplicant/:id").post(isAuthenticated, getApplicants);
router.route("/update/:id").post(isAuthenticated, updateSatus);
export default router;