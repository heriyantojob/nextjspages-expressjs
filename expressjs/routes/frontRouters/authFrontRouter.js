import express from "express";

import { body } from 'express-validator';
import { 
    refresh,
 
}  from "../../controllers/frontControllers/auth/refreshFrontController.js";

import { 
    login,
 
} from "../../controllers/frontControllers/auth/loginFrontController.js";

import dbConfig from "../../config/dbConfig.js"
import { 
    register,
 
} from "../../controllers/frontControllers/auth/registerFrontController.js";


import { 
    logout,
 
} from "../../controllers/frontControllers/auth/logoutFrontController.js";
const router = express.Router();
 
router.post('/register',
        body('username').isLength({ min: 1 }).withMessage('Username min  1 karakter')
        
        .custom(value => {

            return  dbConfig.table('user').where('username', '=', value)
                .first('id_user').then(function(row) {
                    // res.status(400).json({message : "duplicate Email",row:row});
                    // return;
                    if(row){
                        return Promise.reject('Username already in use');
                       // console.log(row); 
                    }
                 
                })

         
        }), 
        body("email").isLength({ min: 1 }).withMessage('Email Minimal 1 karakter')
            .isEmail().withMessage('format Email salah')
            .custom(value => {
            
                return  dbConfig.table('user').where('email', '=', value)
                    .first('id_user').then(function(row) {
                        // res.status(400).json({message : "duplicate Email",row:row});
                        // return;
                        // console.log("value data",value)
                        // console.log("row data",row); 
                        if(row){
                            return Promise.reject('E-mail already in use');
                        }
                        
                        
                    })
             
            }),
        body("password").isLength({ min:5 }).withMessage('Password Minimal 5 karakter'), 
        register)
 
router.post('/login',
  login);

router.get('/logout',logout);
router.get('/refresh',refresh);


 
export default router;