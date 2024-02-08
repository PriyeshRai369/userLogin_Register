import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"
cloudinary.config({ 
  cloud_name: 'priyesh', 
  api_key: '922895654313775', 
  api_secret: 'TpuVPx_FineoRxh2i3gIt20OSPg' 
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