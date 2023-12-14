import dbConfig from "../../../config/dbConfig.js"
export const checkDb = async (req, res) => {
  
    dbConfig.raw("SELECT 1").then(() => {
        console.log("PostgreSQL connected");
      return res.status(200).json({message : "berhasil connect"})
    })
    .catch((e) => {
        console.log("PostgreSQL not connected");
        console.error(e);
        return res.status(200).json({message : "gagal  connect"})
        
    });
}