// import dbConfig from "../config/dbConfig.js"
import { uploadFileS3, getFileStream ,s3,s3BucketName, s3Region,s3AccessKeyId,s3SecretAccessKey,s3Endpoint} from '../../../config/s3.js'
import fs from "fs";
// import util from "util"
import PostModel from "../../../models/PostModel.js"
import PostFileModel from "../../../models/PostFileModel.js"

import sharp from "sharp"
import path from "path"
import slug from "slug"

// import dbConfig from "../../../config/dbConfig.js"
// import multer from 'multer'  
// import multerS3 from 'multer-s3' 
// import aws  from 'aws-sdk';

// const unlinkFile = util.promisify(fs.unlink)

export   const  uploadFile = async (req, res) => {
  //mulai coding
  const file = req.file

    // return res.json({"file":file})
  if (!file) {
    return res.status(422).json( {
      errorMessage: 'Attached file is not found',
    });
  }
  let postId =0
  if(req.action=="insert"){

    //insert Data upload
    try {
      let resultPostInsert = await PostModel.query().insert({});
      postId = resultPostInsert.post_id
      //return res.json({resultPostInsert:resultPostInsert}) 
    } catch (error) {
      return res.json({"message_test_error_insert":error});
    }

  }else{
    //update id upload
    postId=req.params.postId;
  }

  const fileSharpOri = await sharp(file.path);
  let fileSharpOriMetadata = await fileSharpOri.metadata();
  let resultUploadS3 ={}
  try {
  
    resultUploadS3 = await uploadFileS3(file,  postId+"/"+file.originalname)
    //return res.json({"masuk":postId+"/"+file.originalname});
    //await fs.unlinkSync(file.path)
   // console.log(resultUploadS3)
  } catch (error) {
    //console.log(error)
    // await fs.unlinkSync(file.path)
   // return res.json({"message_test_error":error});
  }//end try catch result Upload s3

  //upload resize images
  let mimeTypeArray  = file.mimetype.split("/");
  slug.charmap['.'] = '.'
  let fileOriginalname = slug(file.originalname)
  if(mimeTypeArray[0]=="image"){
    const fileSharpOri = await sharp(file.path);
    let fileSharpOriMetadata = await fileSharpOri.metadata();


    let uploadSmall =  await uploadFileS3Resize( postId,file ,fileSharpOri,fileOriginalname,"small",320)
    let uploadMedium =  await uploadFileS3Resize( postId,file ,fileSharpOri,fileOriginalname,"medium",640)
    //delete file setelah Uplaod
 
    //delete small
    await unlinkFile(uploadSmall.pathResolve);

    await unlinkFile(uploadMedium.pathResolve);
   
   
    //await fs.unlinkSync(uploadSmall.pathResolve)
  }

  const insertData = {
    post_id :postId,
    file_name :file.originalname,
    file_mime : file.mimetype,
    file_size :file.size,
    file_width:fileSharpOriMetadata.width,
    file_height:fileSharpOriMetadata.height
  }
  let resultUploadFile = await PostFileModel.query().insert(insertData);

  return res.json({message:"selesai",imagePath: `/post/download/` +postId+"/"+file.originalname})


  

}


export const uploadFileInsert  = async (req, res, next) => {

  req.action = "insert";
          
   next();
}

export const uploadFileUpdate  = async (req, res, next) => {

  req.action = "update";
          
   next();
}
export const uploadDummy= async(req, res)=>{
    
  const file = req.file
  // 

  if (!file) {
    return res.status(422).json( {
      errorMessage: 'Attached file is not found',
    });
  }

  let mimeTypeArray  = file.mimetype.split("/");
  slug.charmap['.'] = '.'
  let fileOriginalname = slug(file.originalname)


 
  let resultUploadS3 = await uploadFileS3(file, fileOriginalname)



  //return res.json({slug:fileOriginalname})
  
  if(mimeTypeArray[0]=="image"){
    const fileSharpOri = await sharp(file.path);
    let fileSharpOriMetadata = await fileSharpOri.metadata();
    let resizeWidthName="small"


    let uploadSmall =  await uploadFileS3Resize("0",file ,fileSharpOri,fileOriginalname,resizeWidthName="small",resizeWidth=320)
    let uploadMedium =  await uploadFileS3Resize("0",file ,fileSharpOri,fileOriginalname,resizeWidthName="medium",resizeWidth=640)
    //delete file setelah Uplaod
 
    //delete small
    await unlinkFile(uploadSmall.pathResolve);

    await unlinkFile(uploadMedium.pathResolve);
   
   
    //await fs.unlinkSync(uploadSmall.pathResolve)


  

  }
  //console.log("selesai")
    await fs.unlinkSync(file.path)
    return res.json({file:file})

}
const unlinkFile = async(path)=>{
  try {
    if (await fs.existsSync(path)) {
      //file exists
      //return res.json({error:uploadMedium.pathResolve})
      await fs.unlinkSync(path)
    }

  } catch (error) {
   // return res.json({error:error})
  }
 
}
const uploadFileS3Resize= async(postId,file ,fileSharpOri,fileOriginalname,resizeWidthName="small",resizeWidth=320)=>{

  let pathResolve = await path.resolve(file.destination,resizeWidthName+"-"+file.filename)
  
  let fileSharpCrop =await fileSharpOri
        .resize(resizeWidth, null)
        .toFile(
          pathResolve
        )
  const fileStream = await fs.createReadStream(pathResolve)


  const uploadParams = {
    Bucket: s3BucketName,
    Body: fileStream,
    Key: postId+"/"+resizeWidthName+"-"+fileOriginalname
  }
  await s3.upload(uploadParams).promise()
  return {pathResolve}
  
}



// https://www.tutsmake.com/node-js-resize-image-before-upload-using-multer-sharp-example/