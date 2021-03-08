
const { template } = require("handlebars");
const db = require("../models/index");


class templateContent{

    addTemplateContent=async(request)=>{
        try{
                const templateCont = await db.templateContent.create({
                    template_id:request.payload.template_id,
                    language_id:request.payload.language_id,
                    subject:request.payload.subject,
                    templates:request.payload.templates,
                    replacement:request.payload.replacement
                })
                return templateCont
        }
        catch(e){
            console.log('err',e)
        }

    }

    getTemplateContent=async(request)=>{
        try{
            const templateData = await db.templateContent.findAll()
            return templateData;
        }
        catch(e){
                return request.i18n.__("message")
        }
    }

    updateTemplateContent=async(request)=>{
        try{
                const temp =await db.templateContent.update({
                    template_id:request.payload.template_id,
                    language_id:request.payload.language_id,
                    subject:request.payload.subject,
                    templates:request.payload.templates,
                    replacement:request.payload.replacement,
                },
                {
                 where:{
                        id:request.params.id
                    }
                
                })
                return temp;
        }
        catch(e){
            return request.i18n.__("message")
        }
    }

    deleteTemplateContent=async(request)=>{
        try{
                const del = await db.templateContent.destroy({
                    where:{
                        id:request.payload.id
                    }
                })

                return del
        }
        catch(e){
            return request.i18n.__("message")
        }
    }
    
}

module.exports= new templateContent()