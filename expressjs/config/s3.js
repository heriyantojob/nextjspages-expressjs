import dotenv from "dotenv";
dotenv.config();
import  fs from 'fs'
import aws   from 'aws-sdk';

export const s3BucketName = process.env.AWS_BUCKET_NAME
export const s3Region = process.env.AWS_BUCKET_REGION
export const s3AccessKeyId = process.env.AWS_ACCESS_KEY
export const s3SecretAccessKey = process.env.AWS_SECRET_KEY
export const s3Endpoint = new aws.Endpoint(process.env.AWS_ENDPOINT); 
export const s3 = new aws.S3({
  region: s3Region,
  accessKeyId: s3AccessKeyId,
  secretAccessKey: s3SecretAccessKey,
  endpoint: s3Endpoint,
})

// uploads a file to s3
export function uploadFileS3(file,fileName="sample", bucketName = null) {
  const fileStream = fs.createReadStream(file.path)

  const uploadParams = {
    Bucket: bucketName||s3BucketName,
    Body: fileStream,
    Key: fileName
  }

  return s3.upload(uploadParams).promise()
}



// downloads a file from s3
export function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: s3BucketName
  }

  return s3.getObject(downloadParams).createReadStream()
}
