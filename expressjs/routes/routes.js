// Import express
import express from "express";
// Import Controller Product
import multer from 'multer'  
const uploadMulter = multer({ dest: 'uploads/' })
import {

    isFrontAuth
  
  } from '../middleware/AuthFrontMiddleware.js';
import { 
    index,
    loginSuccess
  
 } from "../controllers/frontControllers/dummy/SampleControllers.js.js";

 import { 
  download,upload

} from "../controllers/frontControllers/dummy/SampleS3Controllers.js";
 
 // Init express router
const router = express.Router();
 
// Route get semua product
router.get('/sample', index);
router.get('/sample/loginSuccess',isFrontAuth, loginSuccess);
router.get('/sample/download/:key', download);
router.post('/sample/upload',uploadMulter.single('image'),
upload);
 
// export router
export default router;