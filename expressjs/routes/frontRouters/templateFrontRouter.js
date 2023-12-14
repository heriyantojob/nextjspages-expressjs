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

    submitList
  
  } from '../../controllers/frontControllers/template/templateSubmitListController.js';
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

    router.patch( "/:id",
                  isFrontAuth,
                    body('title')
                      .isLength({ min: 2 }).withMessage('Title min  2 karakter'),
                    body('tags')
                      .isLength({ min: 2 }).withMessage('Tags min  2 karakter'),
                    body('description')
                      .isLength({ min: 5 }).withMessage('description min  5 karakter'),
                    // body('update_status')
                    //   .isNumeric().withMessage('Status Update tidak tersedia'),
                    // body('live_demo_url')
                    //   .isURL().withMessage('Format Live Demo Salah'),
                  templatePatch),
             
    // router.get("/:id",isFrontAuth,templateEditView)
    router.get("/user-submit",isFrontAuth,submitList)
    router.get("/user-upload",isFrontAuth,uploadList)
    router.get("/upload/:id",isFrontAuth,templateEditView)

//     router.post('/upload',
//                 isFrontAuth,upload.single('file'),
//                 uploadFileInsert,
//                 uploadFile);

//     router.post(    '/upload/:idTemplate',
//                     isFrontAuth,upload.single('file'),
//                     uploadFileUpdate,
//                     uploadFile);
                    
//     router.post('/upload-dummy',isFrontAuth,upload.single('file'),
//         uploadDummy);

// router.get('/download/:folder/:key', download);


 
export default router;