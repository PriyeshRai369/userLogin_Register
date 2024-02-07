import dbConnect from "./db.connect.js"
import dotenv from "dotenv"
import app from "./app.js"

dotenv.config({
    path:"./.env"
})

app.set('view engine', 'ejs');

dbConnect().then(()=>{
    app.get('/',(req,res)=>{
        res.render("index")
    })
    // app.get('/user/register',(req,res)=>{
    //     res.render("index")
    // })

    app.listen(3000,()=>{
        console.log("app is started");
    })
}).catch((err)=>{
    console.log(err);
})

