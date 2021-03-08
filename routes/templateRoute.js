const TemplateController = require('../controllers/templateController')
const joi=require('joi')

module.exports=[
    {
        method:"POST",
        path:"/templates",
        handler:TemplateController.addTemplate,
        options: {
            tags: ["api", "Template"],
			notes: "Add template Api",
			description: "Add template Api",
            auth: false,
            validate:{
                options: {
					abortEarly: false
				},
                payload:{
                    template_code:joi.string()
                },
                validator: joi
            } 
            
		}
    },

    {
        method:"GET",
        path:"/gettemplates",
        handler:TemplateController.getTemplate,
        options: {
            tags: ["api", "Template"],
			notes: "GET template Api",
			description: "GET template Api",
            auth: false,
        }

    },
    {
        method:"PUT",
        path:"/updatetemplates/{id}",
        handler:TemplateController.updateTemplate,
        options: {
            tags: ["api", "Template"],
			notes: "Update template Api",
			description: "Update template Api",
            auth: false,
            validate:{
                options: {
					abortEarly: false
				},
                payload:{
                    template_code:joi.string()
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
        path:"/deletetemplates",
        handler:TemplateController.deleteTemplate,
        options: {
            tags: ["api", "Template"],
			notes: "DELETE template Api",
			description: "DELETE template Api",
            auth: false,
            validate:{
                options:{
                    abortEarly:false
                },
                payload:{
                    id:joi.number()
                },
                validator:joi
            }
        }

    },
]