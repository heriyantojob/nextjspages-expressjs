import dbConfig from "../../../config/dbConfig.js"
import sharp from "sharp"
export const resize = async (req, res) => {
    const fileSharpOri =  await sharp("./uploads/dummy/dummy.jpg")
      //get metadata like width and height
      let fileSharpOriMetadata = await fileSharpOri.metadata();
      await fileSharpOri.resize(200,null,{
        fit : "contain"
      }).toFile("./uploads/dummy/dummy-resize.jpg")
      return res.json({"message":"berhasil"})
   //return res.json({"message":"halo"});

 
}



   