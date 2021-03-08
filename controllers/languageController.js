
const db = require("../models/index");

class language{

    addLanguage=async(request)=>{
        try{
                const lang = await db.language.create({
                    code:request.payload.code,
                    name:request.payload.name,
                    default:request.payload.default
                })
                return lang
        }
        catch(e){
            console.log('err',e)
        }

    }

    getLanguage=async(request)=>{
        try{
                const getLang = await db.language.findAll()
                return getLang
        }
        catch(e){
            return e


        }
    }

    updateLanguage=async(request)=>{
        console.log('###',request.params.id)
        console.log('&&&&',request.payload.name)
        try{
            const result = await db.language.update({
                code:request.payload.code,
                    name:request.payload.name,
                    default:request.payload.default
            } , {
                where : {
                    id : request.params.id
                }
            })
            console.log('*******',result)
            return result;
        }catch(e){
            return e;
        }
    }

    deleteLanguage=async(request)=>{
        try{
            const deletelang = await db.language.destroy({
                where : {
                    id : request.payload.id
                }
            })
            return deletelang
        }catch(e){
            return e;
        }
    }
    
}

module.exports= new language()

