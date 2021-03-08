const joi = require("joi");
const socialController = require("../controllers/businessSocialPlatform");

module.exports = [
  {
    method: "GET",
    path: "/getsocialplatform",
    handler: socialController.getSocial,
    options: {
      tags: ["api", "BusinessSocial"],
      notes: "Get Social Api",
      description: "Get Social Api",
      auth: false,
    },
  },

  {
    method: "POST",
    path: "/addsocialplatform",
    handler: socialController.addSocial,
    options: {
      tags: ["api", "BusinessSocial"],
      notes: "Add Social Api",
      description: "Add Social Api",
      auth: false,
      validate: {
        options: {
          abortEarly: false,
        },
        payload: {
          business_Id: joi.number(),
          platformName: joi.array().items(joi.string()),
          platformLink: joi.array().items(joi.string()),
        },
        validator: joi,
      },
    },
  },

  {
    method: "PUT",
    path: "/editsocialplatform/{id}",
    handler: socialController.editSocial,
    options: {
      tags: ["api", "BusinessSocial"],
      notes: "Edit Social Api",
      description: "Edit Social Api",
      auth: false,
      validate: {
        options: {
          abortEarly: false,
        },
        payload: {
          platformName: joi.string(),
          platformLink: joi.string(),
        },
        params: {
          id: joi.number(),
        },
        validator: joi,
      },
    },
  },

  {
    method: "DELETE",
    path: "/deletesocial",
    handler: socialController.delSocial,
    options: {
      tags: ["api", "BusinessSocial"],
      notes: "Delete Social Api",
      description: "Delete Social Api",
      auth: false,
      validate: {
        options: {
          abortEarly: false,
        },
        payload: {
          id: joi.number(),
        },
        validator: joi,
      },
    },
  },
];
