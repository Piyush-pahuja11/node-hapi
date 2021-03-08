const categoryController = require("../controllers/businessMenuCategory");
const joi = require("joi");

module.exports = [
  {
    method: "POST",
    path: "/addcategory",
    handler: categoryController.addCategory,
    options: {
      tags: ["api", "BusinessMenuCategory"],
      notes: "Post Category Api",
      description: "Post Category Api",
      auth: false,
      validate: {
        options: {
          abortEarly: false,
        },
        payload: {
          menu_Id: joi
            .number()
            .required()
            .error((errors) => {
              return new Error("menu_Id is required");
            }),
          name: joi
            .string()
            .required()
            .error((errors) => {
              return new Error("name is required");
            }),
        },
        validator: joi,
      },
    },
  },

  {
    method: "GET",
    path: "/getcategory",
    handler: categoryController.getCategory,
    options: {
      tags: ["api", "BusinessMenuCategory"],
      notes: "Get category Api",
      description: "Get category Api",
      auth: false,
    },
  },

  {
    method: "PUT",
    path: "/editcategory/{id}",
    handler: categoryController.editCategory,
    options: {
      tags: ["api", "BusinessMenuCategory"],
      notes: "Edit category Api",
      description: "Edit category Api",
      auth: false,
      validate: {
        options: {
          abortEarly: false,
        },
        payload: {
          name: joi.string().required(),
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
    path: "/deletecategory",
    handler: categoryController.deleteCategory,
    options: {
      tags: ["api", "BusinessMenuCategory"],
      notes: "Delete category Api",
      description: "Delete category Api",
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
