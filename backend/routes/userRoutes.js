import express from "express"
import { authUser, getUserProfile, registerUser, updateUserProfile, getUsersList } from "../controllers/userController.js"
import { protect, isAdmin } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route('/')
    .get(protect, isAdmin, getUsersList)
    .post(registerUser)

router.post('/login', authUser)

router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)

export default router