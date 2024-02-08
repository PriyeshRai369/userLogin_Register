import dbConnect from "./db.connect.js"
import dotenv from "dotenv"
import app from "./app.js"
import { User } from "./user.models.js";
import { name } from "ejs";

dotenv.config({
    path:"./.env"
})

app.set('view engine', 'ejs');

dbConnect().then(()=>{
    app.get('/',(req,res)=>{
        res.render("index")
    })
    app.get('/user/:username',async (req,res)=>{
        const userName = req.params.username;

        const user = await User.findOne({username:userName})
        let name = user.name
        let urname = user.username
        let email = user.email
        let avatar = user.avatar
        
        res.render("userProfile",{name,email,urname,avatar})
    })

    app.listen(3000,()=>{
        console.log("app is started");
    })
}).catch((err)=>{
    console.log(err);
})

