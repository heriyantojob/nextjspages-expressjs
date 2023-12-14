import TemplateModel from "../../../models/TemplateModel.js"
import TemplateFileModel from "../../../models/TemplateFileModel.js"
export   const  templateEditView = async (req, res) => {
  //  res.json({ idUser: req.auth.idUser});
    try {
    //await dbConfig.table(userModelTable).where('email', '=', email)
  
        //.where("in_preview","=",1)
        // .where('id_template', '=', 33)
       // return        res.json({"data":resultDataFile})

  

    //    console.log("start : ",offset,"\n End",(offset+limit-1))
    


       let  resultData = await TemplateModel.query().select("*","id_template_product as product")
                                .where('id_user', '=', req.auth.idUser)
                                .where('id_template', '=', req.params.id)
                                //.limit()
                                .first();
                                //.orderBy('created_at', 'desc');
                             
       if(resultData){
        // return        res.json({resultData:resultData.id_template})
        // console.log("Masuk result ",resultData.results.length);
        try {
            let resultDataFile = await TemplateFileModel.query()
            .where('id_template', '=', resultData.id_template)
            .where('in_download', '=', 1).first()
          //  console.log("resultDataFile " , resultDataFile)
            if(resultDataFile){;

                resultData.resultfile = resultDataFile
            }
        } catch (error) {
            
        }
        return        res.json({resultData:resultData})

       

       }else{
        //console.log("Tidak masuk result");
       }
     
      
        
        return        res.json({resultData:resultData.results})
    }
    catch(error){
        res.status(400);
        //  res.json({ message: "Can Not get data From Database" });
        res.json({ message: "error",error });
        return
    }


}

export   const  uploadListTes = async (req, res) => {
    try {
        let resultDataFile = await TemplateFileModel.query()

        .where('id_template', '=', 45)
        .where('in_download', '=', 1).first().toKnexQuery().toString()
      //  console.log("resultDataFile " , resultDataFile)
        return res.json({message:resultDataFile})
        if(resultDataFile){;

            resultData.results[i].resultfile = resultDataFile
        }
     
    } catch (error) {
        
    }

}

