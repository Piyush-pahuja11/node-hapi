const joi = require("joi");
const tagController = require("../controllers/businessTags");

module.exports = [
  {
    method: "GET",
    path: "/gettag",
    handler: tagController.gettag,
    options: {
      tags: ["api", "BusinessTags"],
      notes: "Get Tags Api",
      description: "Get Tags Api",
      auth: false,
    },
  },

  {
    method: "POST",
    path: "/addtag",
    handler: tagController.addtag,
    options: {
      tags: ["api", "BusinessTags"],
      notes: "Add Tags Api",
      description: "Add Tags Api",
      auth: false,
      validate: {
        options: {
          abortEarly: false,
        },
        payload: {
          tagName: joi.array().items(joi.string()).required(),
        },
        validator: joi,
      },
    },
  },

  {
    method: "PUT",
    path: "/edittag/{id}",
    handler: tagController.edittag,
    options: {
      tags: ["api", "BusinessTags"],
      notes: "Edit Tag Api",
      description: "Edit Tag Api",
      auth: false,
      validate: {
        options: {
          abortEarly: false,
        },
        payload: {
          tagName: joi.string(),
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
    path: "/deletetag",
    handler: tagController.deletetag,
    options: {
      tags: ["api", "BusinessTags"],
      notes: "Delete Tag Api",
      description: "Delete Tag Api",
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
