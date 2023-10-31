import express from 'express'
const router=express.Router()

import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getAllUserProfile
} from '../controller/userController.js';

import { protect } from '../middleware/authMiddleware.js';

router.post('/',registerUser);
router.post('/login',authUser);
router.post('/logout',logoutUser);
router.route("/allprofile").get(protect,getAllUserProfile);
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile);


export default router;