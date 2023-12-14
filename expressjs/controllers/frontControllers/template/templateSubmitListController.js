import TemplateModel from "../../../models/TemplateModel.js"
import TemplateFileModel from "../../../models/TemplateFileModel.js"
export   const  submitList  = async (req, res) => {
  //  res.json({ idUser: req.auth.idUser});
    try {
    //await dbConfig.table(userModelTable).where('email', '=', email)
  
        //.where("in_preview","=",1)
        // .where('id_template', '=', 33)
       // return        res.json({"data":resultDataFile})
      let status =  req.query.status

       const limit = parseInt(req.query.limit)||8;
      // console.log("limit",limit)
       let page = parseInt(req.query.page)-1||0;
       if(page<0 ){
             res.status(400).json({ message: 'Halaman mesti diatas 0' });
             return
           // return res.json({ message: "Halaman wajib diatas 0" });
       }
       if(limit<1){
           res.status(400).json({ message: 'Limit Halaman tidak sesuai' });
           
           return;
         // return res.json({ message: "Halaman wajib diatas 0" });
       }
   
   
       const offset = page ? (page * limit) : 0;

    //    console.log("start : ",offset,"\n End",(offset+limit-1))



       let  resultData = await TemplateModel.query()
                                .where('id_user', '=', req.auth.idUser)
                                .where('status', '=', status)
                                
                                //.limit()
                                .range(offset,(offset+limit-1))
                                .orderBy('created_at', 'desc');
      
       if(resultData){
        //console.log("Masuk result ",resultData.results.length);

        for  (let i = 0; i < resultData.results.length; i++) {
          
            try {
                let resultDataFile = await TemplateFileModel.query()
                .where('id_template', '=', resultData.results[i].id_template)
                .where('in_download', '=', 1).first()
                //console.log("resultDataFile " , resultDataFile)
                if(resultDataFile){;

                    resultData.results[i].resultfile = resultDataFile
                }
            } catch (error) {
                
            }
            
        } 

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



