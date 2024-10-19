import express from 'express'
import { RigisterCompany, getCompany, getCompanyById, findCompanyAndUpdate } from '../Controler/Company.js'
import { isAuthenticated } from '../Middleware/isAuthenticated.js'
import upload from '../Middleware/multer.js'
const router = express.Router()

router.route("/register").post(isAuthenticated, RigisterCompany)
router.route("/get").post(isAuthenticated, getCompany)
router.route("/get/:id").post(isAuthenticated, getCompanyById)
router.route("/update/:id").post(upload.single('file'), isAuthenticated, findCompanyAndUpdate)

export default router;