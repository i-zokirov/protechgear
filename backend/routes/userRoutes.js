import express from "express"
import { authUser, getUserProfile, registerUser, updateUserProfile, getUsersList, deleteUser } from "../controllers/userController.js"
import { protect, isAdmin } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route('/')
    .get(protect, isAdmin, getUsersList)
    .post(registerUser)

router.post('/login', authUser)

router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)

router.route('/:userId')
    .delete(protect, deleteUser)
export default router