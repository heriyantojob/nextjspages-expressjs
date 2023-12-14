// import dbConfig from "../config/dbConfig.js"
import { uploadFileS3, getFileStream ,s3,s3BucketName, s3Region,s3AccessKeyId,s3SecretAccessKey,s3Endpoint} from '../../../config/s3.js'
import fs from "fs";
// import util from "util"
import TemplateModel from "../../../models/TemplateModel.js"
import TemplateFileModel from "../../../models/TemplateFileModel.js"




import sharp from "sharp"
import path from "path"
import slug from "slug"

// import dbConfig from "../../../config/dbConfig.js"
// import multer from 'multer'  
// import multerS3 from 'multer-s3' 
// import aws  from 'aws-sdk';

// const unlinkFile = util.promisify(fs.unlink)
const bucketNameTemplate =process.env.AWS_BUCKET_NAME_TEMPLATE;

export   const  uploadFile = async (req, res) => {
  //mulai coding
  const file = req.file

  // return res.json({"file":file})
  if (!file) {
    return res.status(422).json( {
      errorMessage: 'Attached file is not found',
    });
  }
  let idTempalte =0
  if(req.action=="insert"){

    //insert Data upload
    try {
      let resultPostInsert = await TemplateModel.query().insert({
        id_user :req.auth.idUser,
        id_template_product : req.body.product
      });
      idTempalte = resultPostInsert.id_template
      //return res.json({resultPostInsert:resultPostInsert}) 
    } catch (error) {
      return res.json({"message_test_error_insert":error});
    }

  }else{
    //update id upload
    idTempalte=req.params.idTemplate;
  }

  // const fileSharpOri = await sharp(file.path);
  // let fileSharpOriMetadata = await fileSharpOri.metadata();
  let resultUploadS3 ={}
    //upload resize images
  let mimeTypeArray  = file.mimetype.split("/");
  //abaikan titik slug
  slug.charmap['.'] = '.'
  let fileOriginalname = slug(file.originalname)
  let fileWidth = null;
  let fileHeight = null;
  let fileList = {}
  try {
  
    resultUploadS3 = await uploadFileS3(file,  idTempalte+"/"+fileOriginalname,bucketNameTemplate)

    //await fs.unlinkSync(file.path)
   // console.log(resultUploadS3)
  } catch (error) {
    //console.log(error)
    // await fs.unlinkSync(file.path)
   // return res.json({"message_test_error":error});
  }//end try catch result Upload s3


  if(mimeTypeArray[0]=="image"){
    const fileSharpOri = await sharp(file.path);
    let fileSharpOriMetadata = await fileSharpOri.metadata();
    fileWidth =  fileSharpOriMetadata.width
    fileHeight =  fileSharpOriMetadata.height

    let uploadThumbnail=  await uploadFileS3Resize(idTempalte,file ,fileSharpOri,fileOriginalname,"thumbnail",320)
    let uploadSmall =  await uploadFileS3Resize(idTempalte,file ,fileSharpOri,fileOriginalname,"small",640)
    let uploadMedium =  await uploadFileS3Resize(idTempalte,file ,fileSharpOri,fileOriginalname,"medium",1280)
    let uploadLarge =  await uploadFileS3Resize(idTempalte,file ,fileSharpOri,fileOriginalname,"large",1920)
    //file list

    fileList['thumbnail'] = {
      file_name :uploadThumbnail.fileName,  
      file_width :uploadThumbnail.resultSharp.width,
      file_height : uploadThumbnail.resultSharp.height,
      file_size: uploadThumbnail.resultSharp.size,
    }
    fileList['small'] = {
      file_name :uploadSmall.fileName,  
      file_width :uploadSmall.resultSharp.width,
      file_height : uploadSmall.resultSharp.height,
      file_size: uploadSmall.resultSharp.size,
    }
    fileList['medium'] = {
      file_name :uploadMedium.fileName,  
      file_width :uploadMedium.resultSharp.width,
      file_height : uploadMedium.resultSharp.height,
      file_size: uploadMedium.resultSharp.size,
    }
    fileList['large'] = {
      file_name :uploadLarge.fileName,  
      file_width :uploadLarge.resultSharp.width,
      file_height : uploadLarge.resultSharp.height,
      file_size: uploadLarge.resultSharp.size,
    }
 
 
    //delete file resize
    await unlinkFile(uploadThumbnail.pathResolve);
    await unlinkFile(uploadSmall.pathResolve);

    await unlinkFile(uploadMedium.pathResolve);
    await unlinkFile(uploadLarge.pathResolve);
   
   
    //await fs.unlinkSync(uploadSmall.pathResolve)
  }

  const insertData = {
    id_template :idTempalte,
    file_name :fileOriginalname,
    file_mime : file.mimetype,
    file_size :file.size,
    file_width:fileWidth,
    file_height:fileHeight,
    file_list:fileList,
    in_download:1,
    in_preview:1
  }
  let resultUploadFile = await TemplateFileModel.query().insert(insertData);

  return res.json({message:"selesai",imagePath: `/template/download/` +idTempalte+"/"+file.originalname})


  

}


export const uploadFileInsert  = async (req, res, next) => {

  req.action = "insert";
          
   next();
}

export const uploadFileUpdate  = async (req, res, next) => {

  req.action = "update";
          
   next();
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

const uploadFileS3Resize= async(idTemplate,file ,fileSharpOri,fileOriginalname,resizeWidthName="small",resizeWidth=320)=>{

  let pathResolve = await path.resolve(file.destination,resizeWidthName+"-"+file.filename)
  
  let resultSharp =await fileSharpOri
        .resize(resizeWidth, null)
        .toFile(
          pathResolve
        )
  const fileStream = await fs.createReadStream(pathResolve)
 // console.log("filestream",fileStream)
          let fileName = resizeWidthName+"-"+fileOriginalname;
  const uploadParams = {
    Bucket: bucketNameTemplate ,
    Body: fileStream,
    Key: idTemplate+"/"+fileName
  }
  let  resultUploadS3= await s3.upload(uploadParams).promise()
  // console.log("fileSharpCrop\n",resultSharp)
  // console.log("resultUploadS3 \n",resultUploadS3)
  return {pathResolve,resultUploadS3,fileName,resultSharp}
  
}



//dummy
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


 
  let resultUploadS3 = await uploadFileS3(file, "0/"+fileOriginalname,process.env.AWS_BUCKET_NAME_TEMPLATE)

  let fileList = {}

  //return res.json({slug:fileOriginalname})
  
  if(mimeTypeArray[0]=="image"){
    const fileSharpOri = await sharp(file.path);
    let fileSharpOriMetadata = await fileSharpOri.metadata();
    let resizeWidthName="small"

    
    let uploadThumbnail=  await uploadFileS3Resize(idTemplate,file ,fileSharpOri,fileOriginalname,"thumbnail",320)
    let uploadSmall =  await uploadFileS3Resize(idTemplate,file ,fileSharpOri,fileOriginalname,"small",640)
    let uploadMedium =  await uploadFileS3Resize(idTemplate,file ,fileSharpOri,fileOriginalname,"medium",1280)
    let uploadLarge =  await uploadFileS3Resize(idTemplate,file ,fileSharpOri,fileOriginalname,"large",1920)
    //delete file setelah Uplaod
    fileList['thumbnail'] = {
      file_name :uploadThumbnail.fileName,  
      file_width :uploadThumbnail.resultSharp.width,
      file_height : uploadThumbnail.resultSharp.height,
      file_size: uploadThumbnail.resultSharp.size,
    }
    fileList['small'] = {
      file_name :uploadSmall.fileName,  
      file_width :uploadSmall.resultSharp.width,
      file_height : uploadSmall.resultSharp.height,
    }
    fileList['medium'] = {
      file_name :uploadMedium.fileName,  
      file_width :uploadMedium.resultSharp.width,
      file_height : uploadMedium.resultSharp.height,
    }
    fileList['large'] = {
      file_name :uploadLarge.fileName,  
      file_width :uploadLarge.resultSharp.width,
      file_height : uploadLarge.resultSharp.height,
    }
 
 

    //delete small
    await unlinkFile(uploadSmall.pathResolve);

    await unlinkFile(uploadMedium.pathResolve);
   
   
    //await fs.unlinkSync(uploadSmall.pathResolve)


  

  }
  //console.log("selesai")
    await fs.unlinkSync(file.path)
    return res.json({file:file,fileList})

}



// https://www.tutsmake.com/node-js-resize-image-before-upload-using-multer-sharp-example/