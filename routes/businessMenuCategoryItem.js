const categoryItemController = require("../controllers/businessMenuCategoryItem");
const joi = require("joi");

module.exports = [
  {
    method: "POST",
    path: "/addcategoryitem",
    handler: categoryItemController.addCategoryItem,
    options: {
      tags: ["api", "BusinessMenuCategoryItem"],
      notes: "Post Category Item Api",
      description: "Post Category Item Api",
      auth: false,
      validate: {
        options: {
          abortEarly: false,
        },
        payload: {
          menuCategory_Id: joi
            .number()
            .required()
            .error((errors) => {
              return new Error("menuCtegory_Id is required");
            }),
          price: joi
            .number()
            .required()
            .error((errors) => {
              return new Error("name is required");
            }),
          itemName: joi.string(),
          itemDescription: joi.string(),
          itemTags: joi.string(),
          isRecommended: joi.string(),
        },
        validator: joi,
      },
    },
  },

  {
    method: "GET",
    path: "/getcategoryitem",
    handler: categoryItemController.getCategoryItem,
    options: {
      tags: ["api", "BusinessMenuCategoryItem"],
      notes: "Get category Item Api",
      description: "Get category Item Api",
      auth: false,
    },
  },

  {
    method: "PUT",
    path: "/editcategoryitem/{id}",
    handler: categoryItemController.editCategoryItem,
    options: {
      tags: ["api", "BusinessMenuCategoryItem"],
      notes: "Edit category Item Api",
      description: "Edit category Item Api",
      auth: false,
      validate: {
        options: {
          abortEarly: false,
        },
        payload: {
          price: joi.string().required(),
          itemName: joi.string(),
          itemDescription: joi.string(),
          itemTags: joi.string(),
          isRecommended: joi.string(),
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
    path: "/deletecategoryitem",
    handler: categoryItemController.deleteCategoryItem,
    options: {
      tags: ["api", "BusinessMenuCategoryItem"],
      notes: "Delete category Item Api",
      description: "Delete category Item Api",
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
