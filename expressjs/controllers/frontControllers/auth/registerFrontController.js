// import dbConfig from "../config/dbConfig.js"
import dbConfig from "../../../config/dbConfig.js"
import bcrypt from 'bcrypt';
import {  validationResult } from 'express-validator';
import UserModel from "../../../models/UserModel.js"
export   const  register = async (req, res) => {
    const errors = validationResult(req);

   
    if (!errors.isEmpty()) {
       res.status(400).json({ errors: errors.array() })
       return;
    }


    const { username, email,password } = req.body;


    try {
      
      const hashedPwd = await bcrypt.hash(password, 10);
      
     await  UserModel.query().insert({"username": username,"email":email,"password":hashedPwd});

   
    // const test =db('sample')
    // .insert({"desc": 'b'}, "idSample")
    // .returning('*')
    // .toString();
      res.status(200).json({message : "register"});
      return;

  } catch (error) {
    //.log(error)
     res.status(500).json({message : error})
     return;
  }
    

}
   