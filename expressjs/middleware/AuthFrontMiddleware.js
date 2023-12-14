import jwt from "jsonwebtoken";
import UserSessionsModel from "../models/UserSessionsModel.js"
import dbConfig from "../config/dbConfig.js"
import { json } from "express";
export const isFrontAuth  = async (req, res, next) => {
  //console.log("req.headers.authorization "+req.headers.authorization)
  const authHeader = req.headers.authorization || req.headers.Authorization;
  // console.log(authHeader)
  if (!authHeader?.startsWith('Bearer ')){
    // console.log("auth  midleware jwt bearer")
    return res.status(401).json({"message":"Token Not found"});
  } 
  const token = authHeader.split(' ')[1];


  jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, decoded) => {
        //console.log("masuk jwt verified")
          if (err){
            //  console.log(err);
           // console.log("auth  midleware jwt error",err)
              return res.sendStatus(403);
          }  //invalid token
         // req.user = decoded;
         try {
         // console.log("masuk try catch")
          let row = await UserSessionsModel.query().select("id_user").where('access_token', '=', token).whereNull('delete_at')
          .first()
         
             // console.log("auth  midleware  row",row)
              if(row){
             //   res.status(401).send({ idUser: row.idUser });
            // console.log("auth  midleware jwt berhasil")

                req.authIdUser =  row.id_user;
                req.auth = {idUser:row.id_user}  ;
    
                next();
              }else{
              //  console.log("auth midleware not select")
                return res.status(401).json({"message":"Token Invalid"});
              }
              
      
        }catch (error) {
          console.log("auth midleware error",error)
          return res.status(401).json({"message":"Token Invalid"
                                    
                                    });
        }
         
          // req.user = decoded.UserInfo.username;
          // req.roles = decoded.UserInfo.roles;
         // next();
         
      }
  );

 
}

export const isAuthBackup = async(req, res, next) => {
  
    const authorization = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    if (authorization) {
      const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
      jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET || '',
        (err, decode) => {
          if (err) {
            res.status(403).send({ message: 'Invalid Token' });
          } else {
            req.user = decode;
            
           // req.requestTime = "SDds"
            next();
          }
        }
      );
    } else {
      res.status(403).send({ message: 'No Token' });
    }



    // let login = false;
    // if(login){
    //     next();
    // }else{
    //     res.status(401).send({ message: 'No Token' });
    // }
  };