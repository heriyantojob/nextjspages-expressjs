import express from "express";
import multer from 'multer'  
const upload = multer({ dest: 'uploads/temp/' })


import { body,check } from 'express-validator';
import {

    isFrontAuth
  
  } from '../../middleware/AuthFrontMiddleware.js';

  import {

    uploadList
  
  } from '../../controllers/frontControllers/template/templateUploadListController.js';
  import {

    templateEditView
  
  } from '../../controllers/frontControllers/template/templateEditViewController.js';

  
import { 
    download,
 
}  from "../../controllers/frontControllers/template/templateDownloadController.js";

import { 
  templatePatch,

}  from "../../controllers/frontControllers/template/templatePatchController.js";
import { 
    uploadFile,uploadFileInsert,uploadFileUpdate,uploadDummy
 
} from "../../controllers/frontControllers/template/templateUploadController.js";



    const router = express.Router();
  //update template

  
             

   // router.get("/upload",isFrontAuth,uploadList)

   //upload file

    router.post('/upload',
                isFrontAuth,upload.single('file'),
                uploadFileInsert,
                uploadFile);

    router.post(    '/upload/:idTemplate',
                    isFrontAuth,upload.single('file'),
                    uploadFileUpdate,
                    uploadFile);
             
    // router.post('/upload-dummy',isFrontAuth,upload.single('file'),
    //     uploadDummy);
    //download file   
  router.get('/download/:folder/:key', download);


 
export default router;