"use strict"
const EmailController = require('../controllers/emailController')
const Attachment = require('../controllers/attachment')
const sendEmailController=require('../email/global')

const joi = require("joi")

module.exports=[
    {
        method:"GET",
        path:"/list-emails",
        handler:EmailController.fetchEmails,
        options: {
            tags: ["api", "Email"],
			notes: "Get Email  Api",
			description: "Get Email  Api",
            auth: false,
            validate: {
				options: {
					abortEarly: false
				},
				query: 
					{
                        pagenumber: joi.number(),
                        emailTo:joi.string(),
                        emailFrom:joi.string(),
                        emailStatus:joi.string()
                       
					}
				,
				validator: joi
			}
    }
	},
	
	{
        method:"GET",
        path:"/get-emails/{id}",
        handler:EmailController.fetchEmailsById,
        options: {
            tags: ["api", "Email"],
			notes: "Get Email by Id Api",
			description: "Get Email by Id Api",
            auth: false,
            validate: {
				options: {
					abortEarly: false
				},
				params: 
					{
						id: joi.number(),
                       
					}
				,
				validator: joi
			} 
	}
    },
    
	
    
	 /* {
        method:"POST",
        path:"/upload",
        handler:Attachment.handleFileUpload,
        options: {
            tags: ["api", "Attachment"],
			notes: "Upload Attachment Api",
			description: "Upload Attachment Api",
			auth: false,
			 payload: {
                maxBytes: 10000000,
                output: "stream",
                parse: true,
                multipart : true,
                timeout: 60000

			}, 
			   validate: {
                options: {
                    abortEarly: false
                },
                payload: {
                    filename: joi.string()
                },
                
                validator: joi
            }, 
		}
    } , */

    {
        method : "POST",
        path : "/sendEmail",
        handler :sendEmailController.Email,
        options: {
            tags: ["api", "Email"],
            notes: "Send Email Api",
            description: "Send Email Api",
            auth : false,
            validate: {
                options: {
                    abortEarly: false
                },
                payload: 
                    {
                        code : joi.string(),
                        emailFrom:joi.string(),
                        emailTo : joi.string(),
                        replacements:joi.string(),
                        
                    }
                ,
                headers : joi.object({
                    language : joi.string().required()
                }).options({allowUnknown : true}),
                validator: joi
            }
        }
    },

	 
]