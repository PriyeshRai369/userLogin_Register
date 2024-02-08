import { User } from "./user.models.js"
import { fileUpload } from "./cloudinary.js";

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
                    const path=req.file.path
                    console.log(path);
                    const avatar = await fileUpload(path)
                    const user = await User.create({
                        name,
                        username,
                        password,
                        email,
                        avatar:avatar?.url || "https://images.rawpixel.com/image_png_400/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjkzNy1hZXctMTM5LnBuZw.png"
                    })
                    const isCreated = await User.findById(user._id).select("-password")
                    if(!isCreated){
                        throw new Error("unable to register user")
                    }
                    else{
                        res.redirect("/user/login")
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
    res.redirect(`/user/${user.username}`)
}
export {userRegistration , userLogin}