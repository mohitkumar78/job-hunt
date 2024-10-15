import express from 'express'
import { register } from '../Controler/RigsterUser.js'
import { login } from '../Controler/RigsterUser.js'
import { logout } from '../Controler/RigsterUser.js'
import { Updateuser } from '../Controler/RigsterUser.js'
import { isAuthenticated } from '../Middleware/isAuthenticated.js'
import upload from '../Middleware/multer.js'
const router = express.Router()

router.route("/register").post(upload.single('file'), register)
router.route("/login").post(login)
router.route("/profile/update").post(upload.single('file'), isAuthenticated, Updateuser)
router.route("/logout").post(logout)
export default router;