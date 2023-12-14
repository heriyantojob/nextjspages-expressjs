import dbConfig from "../../../config/dbConfig.js"

export const index = async (req, res) => {

   return res.json({"message":"halo"});



 
}
export const checkError = async (req, res) => {
  try {
    await testFuntion(0)
  } catch(e) {
    return res.status(404).json({'status':'failed','message':e.message});
  }





}

const testFuntion = (a=1) =>{
  if(a==0){
    throw new Error('email already exist');
  }
  
}


export const loginSuccess = async (req, res) => {
  const cookies = req.cookies;
  console.log("cookies ",req.cookies);
  return res.status(200).json({message : "anda sudah login id "+req.authIdUser+ "refresh token : "+cookies[process.env.REFRESH_TOKEN_COOKIE],
  refreshToken:cookies[process.env.REFRESH_TOKEN_COOKIE]})

}
   