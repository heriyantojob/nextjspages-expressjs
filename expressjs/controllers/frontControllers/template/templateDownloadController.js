// import dbConfig from "../config/dbConfig.js"
import dbConfig from "../../../config/dbConfig.js"


import { s3,uploadFileS3, getFileStream } from '../../../config/s3.js'


export   const  download = async (req, res) => {
 
  const bucketName = process.env.AWS_BUCKET_NAME_TEMPLATE
  // console.log(req.params)
  //return res.json({ process.env.AWS_BUCKET_NAME});
  const key = req.params.key
 // const key = "banner.png"
  const folder = req.params.folder
  const fileKey = folder+"/"+key;
  //return res.json({fileKey})
  
    //const readStream = getFileStream(folder+"/"+key)
    
    const downloadParams = {
      Key: fileKey,
      Bucket: bucketName
    }
    try {
      await s3.headObject(downloadParams).promise();
      const readStream = await s3.getObject(downloadParams).createReadStream()

      readStream.pipe(res)
    } catch (error) {
      return res.status(404).json({"error":error})
      // if (error.name === 'NotFound') {
      //   // Handle no object on cloud here...
      // } else {
      //   // Handle other errors here....
      // }
   
    }
  
}