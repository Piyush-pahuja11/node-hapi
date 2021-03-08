
const db = require("../models/index");

class template{

    addTemplate=async(request)=>{
        try{
                const temp = await db.template.create({
                    template_code:request.payload.template_code,
                })
                return temp

        }
        catch(e){
            console.log('err',e)
        }

    }

    getTemplate=async()=>{
        try{
            const template=await db.template.findAll()
            return template
        }
        catch(e){
                console.log('err',e)
        }
    }

    updateTemplate=async(request)=>{
        try{
            const tempdata= await db.template.update({
                template_code:request.payload.template_code
            },{
                where:{
                    id:request.params.id
                }
            })

            return tempdata
        }
        catch(e){
                console.log('err',e)
        }
    }
    
    deleteTemplate=async(request)=>{
        try{
                const del = await db.template.destroy({
                where:{
                    id:request.payload.id
                }
                })

                return del
        }
        catch(e){

        }
    }
}

module.exports= new template()