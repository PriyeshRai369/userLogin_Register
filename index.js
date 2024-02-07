import dbConnect from "./db.connect.js"
import dotenv from "dotenv"
import app from "./app.js"

dotenv.config({
    path:"./.env"
})



dbConnect().then(()=>{
    app.get('/',(req,res)=>{
        res.send("Hii from Home")
    })

    app.listen(3000,()=>{
        console.log("app is started");
    })
}).catch((err)=>{
    console.log(err);
})

