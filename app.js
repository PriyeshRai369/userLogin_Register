import express from "express"
import cors from "cors"


const app = express()
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"50kb"}))
app.use(express.urlencoded({extended:true},{limit:"50kb"}))
import router from "./user.router.js"
app.use("/user",router)

export default app