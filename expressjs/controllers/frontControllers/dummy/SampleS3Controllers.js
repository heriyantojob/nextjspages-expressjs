// import dbConfig from "../config/dbConfig.js"
import dbConfig from "../../../config/dbConfig.js"




import multer from 'multer'  
import multerS3 from 'multer-s3' 
import aws  from 'aws-sdk';
import { uploadFileS3, getFileStream } from '../../../config/s3.js'
import fs from "fs";
import util from "util"
const unlinkFile = util.promisify(fs.unlink)
export   const  download = async (req, res) => {
  // console.log(req.params)
  //return res.json({ process.env.AWS_BUCKET_NAME});
  const key = req.params.key
 // const key = "banner.png"
  const readStream = getFileStream(key)

  readStream.pipe(res)
}

export   const  upload = async (req, res) => {
    const file = req.file
    // console.log(file)
    // return res.json({file :file});
  
    // apply filter
    // resize 
  
    const result = await uploadFileS3(file,file.originalname)
    await unlinkFile(file.path)
    console.log(result)
    const description = req.body.description
    res.send({imagePath: `/sample/download/${result.Key}`})
   // return res.json({message:req.files.file[0]})
  
  
  
  }
     