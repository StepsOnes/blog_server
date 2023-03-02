import {Router} from "express";
import controller from "../controllers/post.controllers.js";
import {checkAuth} from "../middlewares/checkAuth.middleware.js";

const router = new Router()

router.post('/add', checkAuth, controller.addPost)
router.get('/get/all', checkAuth, controller.getAllPosts)
router.get('/get/one/:id', controller.getOnePost)

export default router