// import dbConfig from "../config/dbConfig.js"

import dbConfig from "../../../config/dbConfig.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import requestIp  from 'request-ip';
import moment from 'moment';
import UserModel from "../../../models/UserModel.js"

import UserSessionsModel from "../../../models/UserSessionsModel.js"

export const login = async (req, res) => {
    //let accessTokenExpired =  Date.now() +(process.env.ACCESS_TOKEN_MINUTE*1000 * 60)
   // console.log("password/n ",req.body.password)
    //return res.json({message :req.body.password})
    const email = req.body.email;
    const password = req.body.password;
    try {
       //await dbConfig.table(userModelTable).where('email', '=', email)
         await UserModel.query().where('email', '=', email)
            .first("password","id_user","email","username").then(async function(row) {

 
            if(row){
                const match = await bcrypt.compare(password, row.password);
                if (match) {
                    const clientIp = requestIp.getClientIp(req); 
                    const userAgent = req.headers["user-agent"];
                 
                    // const sessionID =  await dbConfig('user_sessions').insert(
                    //             {idUser: row.idUser,ip:clientIp,userAgent:userAgent,
                    //                 created_at: moment().format( "YYYY-MM-DD HH:mm:ss"),
                    //                 updated_at: moment().format( "YYYY-MM-DD HH:mm:ss"),
                    //             })

                    const sessionID =  await UserSessionsModel.query().insert(
                        {id_user: row.id_user,ip:clientIp,user_agent:userAgent,
                            // created_at: moment().format( "YYYY-MM-DD HH:mm:ss"),
                            // updated_at: moment().format( "YYYY-MM-DD HH:mm:ss"),
                        })
                
                    const accessToken = jwt.sign({
                        sessionID:sessionID.id_user_session,
                        id:row.id_user
                                        }, process.env.ACCESS_TOKEN_SECRET,{
                        // expiresIn: '15s'
                        expiresIn: process.env.ACCESS_TOKEN_MINUTE * 60
                        // expiresIn: '1m'
                    });
                    // res.status(200).json({message :"berhasil",row : row}); 
                    // return;

                    //day * minute * second
                    const refreshTokenExpiredIn = process.env.REFRESH_TOKEN_MINUTE* 60

                    const newRefreshToken = jwt.sign(
                        {  sessionID:sessionID.id_user_session,id:row.id_user},
                        process.env.REFRESH_TOKEN_SECRET,
                        { expiresIn:  refreshTokenExpiredIn}
                    );
                    let accessTokenExpired = moment().add(process.env.ACCESS_TOKEN_MINUTE,"minutes").format( "YYYY-MM-DD HH:mm:ss")
                    let refreshTokenExpired = moment().add(process.env.REFRESH_TOKEN_MINUTE,"minutes")
                                                        .format( "YYYY-MM-DD HH:mm:ss")
                    await UserSessionsModel.query()  
                            .findById(sessionID.id_user_session)
                       
                        .patch({
                            access_token: accessToken,
                            refresh_token: newRefreshToken,
                            access_token_expired :accessTokenExpired,
                            refresh_token_expired : refreshTokenExpired

                        })

                    res.cookie(process.env.REFRESH_TOKEN_COOKIE, newRefreshToken, { 
                                    httpOnly: true, secure: true, //sameSite: 'None', 
                                    maxAge: refreshTokenExpiredIn * 1000 });

                    // console.log("cookies jwt auth "+res.cookie);
                
                    res.status(200).json({ 
                        sessionID : sessionID.id_user_session,
                            email:row.email,
                            username:row.username,
                            accessToken: accessToken,
                            refreshToken : newRefreshToken
                    });

                    //res.status(200).json({message :"berhasil",row : row}); 
                    return;
                }else{
                    res.status(400).json({ message: "Email and password do not match"});
                    return
                }
               

     
            } else{
               // res.status(200).json({message : "Email and password do not match"}); 
                res.status(400).json({message : "Email and password do not match"});     
                return;
            }
            
         
        })

 
       
       // res.status(200).json({message : email+","+password}); 
      
    } catch (error) {
            res.status(400);
          //  res.json({ message: "Can Not get data From Database" });
         res.json({ message: "error",error });
         return
        
    }



}
   