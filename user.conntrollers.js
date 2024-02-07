import mongoose from "mongoose";
import { User } from "./user.models.js"

const userRegistration = async (req,res)=>{
    try {
        const {name,email,username,password}=req.body
        // console.log(name,email,username,password);
        if(name===""){
            throw new Error("Name Is Required")
        }
        if(email===""){
            throw new Error("Email Is Required")
        }
        if(username===""){
            throw new Error("username Is Required")
        }
        if(password===""){
            throw new Error("Password Is Required")
        }
        else{
            const userEmail = await User.findOne({
                email
            })
            if(userEmail){
                throw new Error("User Already Register with this email")
            }else{
                const userName = await User.findOne({
                    username
                })
                if(userName){
                    throw new Error("Try another username")
                }
                else{
                    const user = await User.create({
                        name,
                        username,
                        password,
                        email
                    })
                    const isCreated = await User.findById(user._id).select("-password")
                    if(!isCreated){
                        throw new Error("unable to register user")
                    }
                    else{
                        // return res.status(201).json({
                        //     data: isCreated,
                        //     message: "User created successfully"
                        // })
                        res.redirect("/user/register")
                    }
                }
            }

        }

    } catch (error) {
        console.log(error);
    }
}

const userLogin = async (req,res)=>{
    const {login,password}=req.body
    if(!login){
        throw new Error("username or email is required")
    }
    const user = await User.findOne({
        $or:[
            {email:login},{username:login}
        ]
    })
    if(!user){
        throw new Error("User Not foun with this email or username")
    }
    const verifyPassword = await user.isPasswordCorrect(password)
    if(!verifyPassword){
        throw new Error("Incorrect Password try again...!")
    }
    const logginUser = await User.findById(user._id)
    .select("-password")
    return res.status(200).json({
        logginUser,
        message:"Login Successfully"
    })
    // res.redirect("/user/register")

}
export {userRegistration , userLogin}