import dbConfig from "../../../config/dbConfig.js"
import jwt from "jsonwebtoken";
import moment from 'moment';

import UserSessionsModel from "../../../models/UserSessionsModel.js"
export const logout = async (req, res) => {

   // res.status(200).json({message : "logout"});

    const cookies = req.cookies;

    if (!cookies[process.env.REFRESH_TOKEN_COOKIE]) return res.sendStatus(204); //No content

    const refreshToken = cookies.jwt;
    
    try {
        await UserSessionsModel.query().where('refresh_token', '=', refreshToken)
        .first("id_user_session").then(async function(row) {
            if(row){

                await UserSessionsModel.query()
                .where('id_user_session', '=', row.id_user_session)
                .update({
                    delete_at: moment().format( "YYYY-MM-DD HH:mm:ss"),

                })
                // return res.json({message:foundUser.id});
               
            
                res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
                res.sendStatus(204);
                return

            }else{
                res.clearCookie(process.env.REFRESH_TOKEN_COOKIE, { httpOnly: true, sameSite: 'None', secure: true });
                 res.sendStatus(204);
                 return
            }

        })
    }catch(error){
        
        res.status(401);
        res.json({message:error});
        return
    }
   



    

}
   