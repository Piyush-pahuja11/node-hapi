const TempController = require('../controllers/templateContentController')
const joi=require('joi')

module.exports=[
    {
        method:"POST",
        path:"/template-Content",
        handler:TempController.addTemplateContent,
        options: {
            tags: ["api", "Template"],
			notes: "Add template-Content Api",
			description: "Add template-Content Api",
            auth: false,
            validate:{
                options: {
					abortEarly: false
				},
                payload:{
                    template_id:joi.number(),
                    language_id:joi.number(),
                    subject:joi.string(),
                    templates:joi.string(),
                    replacement:joi.string()
                },
                validator: joi
            }  
            
		}
    },

    {
        method:"GET",
        path:"/template-Content",
        handler:TempController.getTemplateContent,
        options: {
            tags: ["api", "Template"],
			notes: "Get template-Content Api",
			description: "Get template-Content Api",
            auth: false,   
		}

    },
    {
        method:"PUT",
        path:"/updatetemplateContent/{id}",
        handler:TempController.updateTemplateContent,
        options: {
            tags: ["api", "Template"],
			notes: "Edit template-Content Api",
			description: "Edit template-Content Api",
            auth: false, 
            validate:{
                options: {
					abortEarly: false
				},
                payload:{
                    template_id:joi.number(),
                    language_id:joi.number(),
                    subject:joi.string(), 
                    templates:joi.string(),
                    replacement:joi.string()
                },
                params:{
                        id:joi.number()
                    },
                validator: joi
            }   
		}
    },
    {
        method:"DELETE",
        path:"/deletetemplateContent",
        handler:TempController.deleteTemplateContent,
        options: {
            tags: ["api", "Template"],
			notes: "Delete template-Content Api",
			description: "Delete template-Content Api",
            auth: false,   
            validate:{
                options:{
                    abortEarly: false
                },
                payload:{
                    id:joi.number()
                },
                validator:joi
            }
		}

    },
]