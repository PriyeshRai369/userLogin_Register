import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"
import dotenv from "dotenv"
dotenv.config({path:"./.env"})
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEYS, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const fileUpload = async (filePath)=>{
    try {
        if(!filePath) return null
        const response = await cloudinary.uploader.upload(filePath,{
            resource_type:'auto',
        })
        console.log("file has been uploaded",response.url);
        return response;

    } catch (error) {
        fs.unlinkSync(filePath)
        return null;
    }
}
export {fileUpload}