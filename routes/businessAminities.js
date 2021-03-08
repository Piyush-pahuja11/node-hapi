const joi = require("joi");
const aminitiesController = require("../controllers/businessAminities");

module.exports = [
  {
    method: "GET",
    path: "/getaminities",
    handler: aminitiesController.getAminities,
    options: {
      tags: ["api", "BusinessAminities"],
      notes: "Get Aminities Api",
      description: "Get Aminities Api",
      auth: false,
    },
  },

  {
    method: "POST",
    path: "/addaminities",
    handler: aminitiesController.addAminities,
    options: {
      tags: ["api", "BusinessAminities"],
      notes: "Add Aminities Api",
      description: "Add Aminities Api",
      auth: false,
      validate: {
        options: {
          abortEarly: false,
        },
        payload: {
          aminitiesItem: joi
            .array()
            .items(joi.string())
            .required()
            .error(() => {
              return { message: "Item is required" };
            }),
        },
        validator: joi,
      },
    },
  },

  {
    method: "PUT",
    path: "/editaminities/{id}",
    handler: aminitiesController.editAminities,
    options: {
      tags: ["api", "BusinessAminities"],
      notes: "Edit Aminities Api",
      description: "Edit Aminities Api",
      auth: false,
      validate: {
        options: {
          abortEarly: false,
        },
        payload: {
          aminitiesItem: joi
            .string()
            .required()
            .error(() => {
              return { message: "Item is required" };
            }),
        },
        params: {
          id: joi.number().required(),
        },
        validator: joi,
      },
    },
  },

  {
    method: "DELETE",
    path: "/deleteaminities",
    handler: aminitiesController.deleteAminities,
    options: {
      tags: ["api", "BusinessAminities"],
      notes: "Delete Aminities Api",
      description: "Delete Aminities Api",
      auth: false,
      validate: {
        options: {
          abortEarly: false,
        },
        payload: {
          id: joi
            .number()
            .required()
            .error(() => {
              return { message: "ID is required" };
            }),
        },
        validator: joi,
      },
    },
  },
];
