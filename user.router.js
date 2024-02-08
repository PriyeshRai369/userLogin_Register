import { Router } from "express";
import {userRegistration , userLogin} from "./user.conntrollers.js";
const router=Router()
import {upload} from "./multer.js"


router.route("/register").get((req,res)=>{
    res.render("register")
})
router.route("/register").post(upload.single('avatar'),userRegistration)
router.route("/login").post(userLogin)

router.route("/login").get((req,res)=>{
    res.render("login")
})

export default router