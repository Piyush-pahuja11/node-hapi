"use strict";
const RolesController = require("../controllers/roles");
const universalFunctions = require("../universalFunctions/lib")
const joi = require("joi")

module.exports = [

    // Write your endpoints here
    {
        method : "POST",
		path : "/user/role/createrole",
		handler : RolesController.createRole,
		options: {
			tags: ["api", "roles"],
			notes: "roless Post Api",
			description: "roles Post Api",
			auth: false,
			validate: {
				options: {
					abortEarly: false
				},
				payload: {
					name:joi.string(),
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
        method : "GET",
		path : "/user/role/getroles",
		handler : RolesController.getRoles,
		options: {
			tags: ["api", "roles"],
			notes: "roles get Api",
			description: "roles Get Api",
			auth: false,
			validate: {
				options: {
					abortEarly: false
				},
				// payload: {
				// 	// email:joi.string(),
                //     // your payload or requested body here
				// },
				failAction: async (req, h, err) => {
					return universalFunctions.updateFailureError(err, req);
				},
				validator: joi
			}
		}
    },
  

]