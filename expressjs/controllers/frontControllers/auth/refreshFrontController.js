import dbConfig from "../../../config/dbConfig.js"
import jwt from "jsonwebtoken";
import moment from 'moment';

import UserSessionsModel from "../../../models/UserSessionsModel.js"
export   const  refresh = async (req, res) => {
    res.status(200)

    const cookies = req.cookies;
    // 
   
    if (!cookies[process.env.REFRESH_TOKEN_COOKIE]) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    res.clearCookie(process.env.REFRESH_TOKEN_COOKIE, { httpOnly: true, sameSite: 'None', secure: true });
  

    try {
       // console.log("refreshToken",refreshToken)
    //     let lastQuery= await   UserSessionsModel.query()
    //     //.relatedQuery('user')
    //     .select("user_sessions.id_user_session","user_sessions.id_usser","user.email","user.username")
    //     .join('user', 'user.id_user', '=', 'user_sessions.id_user')
    //     .whereNull('user_sessions.delete_at').where('refresh_token', '=', refreshToken)
    //     .first() 
    //     .toKnexQuery().toString();

    // //    console.log("last query",lastQuery);
    //     return res.json({"last query":lastQuery})

        await 
        UserSessionsModel.query()
            //.relatedQuery('user')
            .select("user_sessions.id_user_session","user_sessions.id_user","user.email","user.username")
            .join('user', 'user.id_user', '=', 'user_sessions.id_user')
            .whereNull('user_sessions.delete_at').where('refresh_token', '=', refreshToken)
            .first("user_sessions.id_user_session","user_sessions.id_usser","user.email","user.username").then(async function(row) {
                
            if(row){
  
               await jwt.verify(
                    refreshToken,
                    process.env.REFRESH_TOKEN_SECRET,
                    async (err, decoded) => {
                        if (err) {
                            // expired refresh token
                            // foundUser.refreshToken = [...newRefreshTokenArray];
                            // const result = await foundUser.save();
                           
                            return res.status(403).json({message:"token not valid"});
                          
                        }
                        
                        if (err || decoded.sessionID!== row.id_user_session) return res.sendStatus(403);   
                        //set new acces and refresh token
                       
                        const accessToken = jwt.sign({
                            sessionID:row.id_user_session,
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
                            {  sessionID:row.id_user_session,id:row.id_user},
                            process.env.REFRESH_TOKEN_SECRET,
                            { expiresIn:  refreshTokenExpiredIn}
                        );
                        let accessTokenExpired = moment().add(process.env.ACCESS_TOKEN_MINUTE,"minutes").format( "YYYY-MM-DD HH:mm:ss")
                        let refreshTokenExpired = moment().add(process.env.REFRESH_TOKEN_MINUTE,"minutes")
                                                            .format( "YYYY-MM-DD HH:mm:ss")

                      
                        await UserSessionsModel.query()
                                .where('id_user_session', '=', row.id_user_session)
                                .update({
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
                            
                            sessionID : row.id_user_session,
                                email:row.email,
                                username:row.username,
                                accessToken: accessToken,
                                refreshToken : newRefreshToken,
                                row:row,
                                message_test:"selesai refresh"
                        });
        
                        //res.status(200).json({message :"berhasil",row : row}); 
                        return;

                        
                    } 
                )  
               
              


        
            }else{
              //  return res.json({"message":"tidak ada row",row:row})
                res.status(403)
                res.json({"message":"token not valid",
                            // "message_test":"gak ada di database"
                        })
                return
            }
        })
    }catch(error){
        res.status(403)
        res.json({
                "message":"token not valid",
                // "message_test":error
        })
        return
    }

   
}