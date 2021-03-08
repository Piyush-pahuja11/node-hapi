"use strict";
const usersController = require("../controllers/users");
const universalFunctions = require("../universalFunctions/lib")
const joi = require("joi")
module.exports = [

    // Write your endpoints here
    {
        method : "POST",
		path : "/user/createSeeder",
		handler : usersController.createSeeder,
		options: {
			tags: ["api", "users"],
			notes: "users Post Api",
			description: "users Post Api",
			auth: false,
			validate: {
				options: {
					abortEarly: false
				},
				payload: {
					// email:joi.string(),
                    // your payload or requested body here
				},
				failAction: async (req, h, err) => {
					return universalFunctions.updateFailureError(err, req);
				},
				validator: joi
			}
		}
    },

  
  

	{
        method : "POST",
		path : "/user/login",
		handler : usersController.checkUser,
		options: {
			tags: ["api", "users"],
			notes: "check user exist or not",
			description: "check user exist or not",
			auth: false,
			validate: {
				options: {
					abortEarly: false
				},
				payload: {
					
					countryCode:joi.string().required(),
					contactNumber:joi.string().required(),	
									
                    // your payload or requested body here
				},
				failAction: async (req, h, err) => {
					return universalFunctions.updateFailureError(err, req);
				},
				validator: joi
			}
		}
    },
	{
        method : "POST",
		path : "/user/verifyotp",
		handler : usersController.verifyOtp,
		options: {
			tags: ["api", "users"],
			notes: "verify otp",
			description: "verify otp",
			auth: false,
			validate: {
				options: {
					abortEarly: false
				},
				payload: {
					
					countryCode:joi.string().required(),
					contactNumber:joi.string().required(),	
					otp:joi.number().required(),
					type:joi.number().required(),
					id:joi.number()
									
                    // your payload or requested body here
				},
				failAction: async (req, h, err) => {
					return universalFunctions.updateFailureError(err, req);
				},
				validator: joi
			}
		}
    },
	{
        method : "PUT",
		path : "/user/signup",
		handler : usersController.signup,
		options: {
			tags: ["api", "users"],
			notes: "signup user",
			description: "signup user",
			auth: false,
			validate: {
				options: {
					abortEarly: false
				},
				payload: {
					
					firstName:joi.string().required(),
					lastName:joi.string().required(),
					email:joi.string().required(),
					countryCode:joi.string().required(),
					contactNumber:joi.string().required(),
					id:joi.string().required(),		
				
									
                    // your payload or requested body here
				},
				failAction: async (req, h, err) => {
					return universalFunctions.updateFailureError(err, req);
				},
				validator: joi
			}
		}
    },
	{
        method : "Post",
		path : "/user/updateProfile",
		handler : usersController.updateProfile,
		options: {
			tags: ["api", "users"],
			notes: "signup user",
			description: "signup user",
			auth: {strategy:'jwt'},
			validate: {
				options: {
					abortEarly: false
				},
				headers : joi.object(
						universalFunctions.headers()
					//	token : joi.string().required()
				).options({allowUnknown : true}),
				payload: {
					
					firstName:joi.string().required(),
					lastName:joi.string().required(),
					email:joi.string().required(),
					
				
									
                    // your payload or requested body here
				},
				
				
				
				validator: joi
			}
		}
    },
	{
        method : "Post",
		path : "/user/updatecontactnumber",
		handler : usersController.updateContactNumber,
		options: {
			tags: ["api", "users"],
			notes: "update user contactnumber",
			description: "update user contactnumber",
			auth: {strategy:'jwt'},
			validate: {
				options: {
					abortEarly: false
				},
				headers : joi.object(
						universalFunctions.headers()
					//	token : joi.string().required()
				).options({allowUnknown : true}),
				payload: {
					
					contactNumber:joi.string().required(),
					countryCode:joi.string().required()
					
				
									
                    // your payload or requested body here
				},
				
				
				
				validator: joi
			}
		}
    },



	//admin api's
	{
        method : "PUT",
		path : "/admin/createuser",
		handler : usersController.createUserbyAdmin,
		options: {
			tags: ["api", "admin"],
			notes: "create user by admin",
			description: "create user by admin",
			auth: {strategy:'jwt'},
			validate: {
				options: {
					abortEarly: false
				},
				headers : joi.object(
						universalFunctions.headers()
					//	token : joi.string().required()
				).options({allowUnknown : true}),
				payload: {
					
					firstName:joi.string().required(),
					lastName:joi.string().required(),
					email:joi.string().required(),
					countryCode:joi.string().required(),
					contactNumber:joi.string().required(),
					
				
									
                    // your payload or requested body here
				},
				
				
				
				validator: joi
			}
		}
    },
	{
        method : "POST",
		path : "/admin/login",
		handler : usersController.loginAdmin,
		options: {
			tags: ["api", "admin"],
			notes: "admin login",
			description: "admin login",
			auth: false,
			validate: {
				options: {
					abortEarly: false
				},
				payload: {
					
					email:joi.string().required(),
					password:joi.string().required(),	
									
                    // your payload or requested body here
				},
				failAction: async (req, h, err) => {
					return universalFunctions.updateFailureError(err, req);
				},
				validator: joi
			}
		}
    },
	{
        method : "POST",
		path : "/admin/getallusers",
		handler : usersController.getUsersbyAdmin,
		options: {
			tags: ["api", "admin"],
			notes: "create user by admin",
			description: "create user by admin",
			auth: {strategy:'jwt'},
			validate: {
				options: {
					abortEarly: false
				},
				headers : joi.object(
						universalFunctions.headers()
					//	token : joi.string().required()
				).options({allowUnknown : true}),
				// payload: {
					
				// 	firstName:joi.string().required(),
				// 	lastName:joi.string().required(),
				// 	email:joi.string().required(),
				// 	countryCode:joi.string().required(),
				// 	contactNumber:joi.string().required(),
					
				
									
                //     // your payload or requested body here
				// },
				
				
				
				validator: joi
			}
		}
    },
	
]