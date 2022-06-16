import express from "express"
import { authUser, getUserProfile, registerUser, updateUserProfile, getUsersList, deleteUser, getUserById, updateUserById, sendEmailVerificationLink, verifyEmailToken } from "../controllers/userController.js"
import { protect, isAdmin } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route('/')
    .get(protect, isAdmin, getUsersList)
    .post(registerUser)

router.post('/login', authUser)

router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)

router.route('/profile/verifyEmail')
    .get(protect, sendEmailVerificationLink)


router.route("/verifyToken")
    .get(verifyEmailToken)
router.route('/:userId')
    .get(protect, isAdmin, getUserById)
    .put(protect, isAdmin, updateUserById)
    .delete(protect, isAdmin, deleteUser)

    
export default router