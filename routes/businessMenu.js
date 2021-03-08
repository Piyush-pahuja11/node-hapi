const menuController = require("../controllers/businessMenu");
const joi = require("joi");

module.exports = [
  {
    method: "POST",
    path: "/addmenu",
    handler: menuController.addMenu,
    options: {
      tags: ["api", "BusinessMenu"],
      notes: "Post Menu Api",
      description: "Post Menu Api",
      auth: false,
      validate: {
        options: {
          abortEarly: false,
        },
        payload: {
          business_Id: joi
            .number()
            .required()
            .error((errors) => {
              return new Error("business_Id is required");
            }),
          title: joi
            .string()
            .required()
            .error((errors) => {
              return new Error("title is required");
            }),
        },
        validator: joi,
      },
    },
  },
];
