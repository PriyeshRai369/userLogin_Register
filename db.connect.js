import mongoose from "mongoose";
const dbConnect = async ()=>{
    try {   
        const conn = await mongoose.connect(`${process.env.DB_URL}`)
        
    } catch (error) {
        console.log("db connection fail",error);   
    }
}
export default dbConnect