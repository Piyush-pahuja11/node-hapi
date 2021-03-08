

const db = require("../models/index");



class emailController {

    fetchEmails = async(request) =>{
        try{
            var params = {};
            if(request.query.emailTo)
            {
                params.emailTo = request.query.emailTo;
            }
            if(request.query.emailFrom)
            {
                params.emailFrom = request.query.emailFrom
            }
            if(request.query.emailStatus)
            {
                params.emailStatus = request.query.emailStatus
            }
            var limit=parseInt(process.env.PAGING_LIMIT)
            var page= request.query.pagenumber ? request.query.pagenumber:1
            var pageNumber = (page-1)*limit
            console.log('ss',pageNumber)
                const email = await db.email.findAll({limit:limit,offset:parseInt(pageNumber) ,where:params })
            const count = await db.email.count({})
            return {responseData:{data :email,pagenum:request.query.pagenumber,Limit:limit,totalCount:count}}

        }catch(e){
                console.log('error',e)
        }

    }


    fetchEmailsById=async(request)=>{
        try{
            const data = await db.email.findAll({where:{id:request.params.id}})
            if(data){
                return {responseData:{data:data}}
            }
            if(!data){
                return request.i18n.__("message")
            }
        }
        catch(e){
            console.log('error',e)
        }
    }

  


}

  

module.exports = new emailController()
