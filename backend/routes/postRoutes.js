import express from "express";
const router=express.Router();
import {addPost, getPosts, getAllPosts, likePost} from "../controller/postController.js";
import { protect } from '../middleware/authMiddleware.js';

router.route("/add").post(protect,addPost);
router.route("/get").get(protect,getPosts);
router.route("/like").post(protect,likePost);
router.route("/getall").get(protect,getAllPosts);

export default router;