const cloudinary = require('cloudinary').v2;

 cloudinary.config({
        cloud_name:"dsiwppwxz",
        api_key:'764963795572124' ,
        api_secret:'8NqwnOqiMGGWIcxSdl893MfuR-A' 
    });

async function cloudinaryfileupload(file){
      try {
        // Upload an image
        const uploadResult = await cloudinary.uploader.upload(
          file 
        ).catch((error)=>{
            console.log(error)
        })
  
    console.log("Upload Result:", uploadResult);

    return uploadResult.url
    } catch (error) {
        console.error("Error uploading image:", error);
    }
}
module.exports = {
    cloudinaryfileupload
}

