const LangController = require('../controllers/languageController')
const joi = require("joi")
module.exports=[
    {
        method:"POST",
        path:"/language",
        handler:LangController.addLanguage,
        options: {
            tags: ["api", "Language"],
			notes: "Add language Api",
			description: "Add language Api",
            auth: false,
               validate:{
                options: {
					abortEarly: false
				},
                payload:{
                    code:joi.string(),
                    name:joi.string(),
                    default:joi.number()
                },
                validator: joi
            }  
            
        },
       
    },

    {
        method:"GET",
        path:"/getlanguage",
        handler:LangController.getLanguage,
        options: {
            tags: ["api", "Language"],
			notes: "Get language Api",
			description: "Get language Api",
            auth: false,
        },
       
    },

    {
        method:"PUT",
        path:"/updatelanguage/{id}",
        handler:LangController.updateLanguage,
        options: {
            tags: ["api", "Language"],
			notes: "Update language Api",
			description: "Update language Api",
            auth: false,
            validate:{
                options: {
					abortEarly: false
				},
                payload:{
                    code:joi.string(),
                    name:joi.string(),
                    default:joi.number(), 
                },
            params:{
                    id:joi.number()
                },
                validator: joi
            }  
        },
       
    },
   { 
    method : "DELETE",
    path : "/deletelanguage",
    handler :LangController.deleteLanguage,
    options: {
        tags: ["api", "Language"],
        notes: "Update language Api",
        description: "Update language Api",
        auth: false,
        validate:{
            options: {
                abortEarly: false
            },
             payload:{
                id:joi.number()
            }, 
            validator: joi
        }  
    },
    

   }
  

]