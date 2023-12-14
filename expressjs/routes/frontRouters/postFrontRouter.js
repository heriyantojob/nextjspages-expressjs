import express from "express";
import multer from 'multer'  
const upload = multer({ dest: 'uploads/temp/' })

import { body,check } from 'express-validator';
import {

    isFrontAuth
  
  } from '../../middleware/AuthFrontMiddleware.js';
import { 
    download,
 
}  from "../../controllers/frontControllers/post/postDownloadController.js";

import { 
    uploadFile,uploadFileInsert,uploadFileUpdate,uploadDummy
 
} from "../../controllers/frontControllers/post/postUploadController.js";



const router = express.Router();
 

 
    router.post('/upload',isFrontAuth,upload.single('file'),
        uploadFileInsert,

        uploadFile);
    router.post('/upload/:postId',isFrontAuth,upload.single('file'),
        uploadFileUpdate,
            uploadFile);

    router.post('/upload-dummy',isFrontAuth,upload.single('file'),
        uploadDummy);

router.get('/download/:folder/:key', download);


 
export default router;