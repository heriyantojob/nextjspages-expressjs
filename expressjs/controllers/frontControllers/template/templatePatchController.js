import TemplateModel from "../../../models/TemplateModel.js"
import TemplateFileModel from "../../../models/TemplateFileModel.js"
import {  validationResult } from 'express-validator';
export   const  templatePatch = async (req, res) => {

    let tagBody = req.body
    // console.log(tagBody)
    // return res.json({"tags":tagBody})
    let tags = req.body.tags.split(","); 
  
    // return res.json({"tags":tags})
    const errors = validationResult(req);

   
    if (!errors.isEmpty()) {
       res.status(400).json({ errors: errors.array() })
       return;
    }


    let dataUpdate = {
      "title" :req.body.title,
      "description" :req.body.description,
      // "live_demo_url" :req.body.live_demo_url ,
      // "update_status":req.body.update_status ,
      "tags":JSON.stringify(tags) 
    }

     let resultPostUpdate = await TemplateModel.query()
      .findById(req.params.id)
      .patch(dataUpdate);

    return res.json({message:"berhasil edit data"})
    //return res.json({resultPostInsert})

}