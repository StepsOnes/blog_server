import { Router } from "express";
import controller from '../controllers/auth.controllers.js'
import {checkAuth} from "../middlewares/checkAuth.middleware.js";

const router = new Router()

router.post('/register', controller.register)
router.post('/login', controller.login)
router.get('/users',checkAuth, controller.getUser)


export default router