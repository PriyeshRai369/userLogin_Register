import { Router } from "express";
import {userRegistration , userLogin} from "./user.conntrollers.js";
import app from "./app.js";
const router=Router()



router.route("/register").get((req,res)=>{
    res.render("register")
})
router.route("/register").post(userRegistration)
router.route("/login").post(userLogin)

router.route("/login").get((req,res)=>{
    res.render("login")
})

export default router