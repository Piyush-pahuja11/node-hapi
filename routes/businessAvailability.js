const joi = require("joi");
const availabilityController = require("../controllers/businessAvailability");

module.exports = [
  {
    method: "GET",
    path: "/getavailability",
    handler: availabilityController.getAvailability,
    options: {
      tags: ["api", "BusinessAvailability"],
      notes: "Get availability Api",
      description: "Get availability Api",
      auth: false,
    },
  },

  {
    method: "POST",
    path: "/addavailability",
    handler: availabilityController.addAvailability,
    options: {
      tags: ["api", "BusinessAvailability"],
      notes: "Add availability Api",
      description: "Add availability Api",
      auth: false,
      validate: {
        options: {
          abortEarly: false,
        },
        payload: {
          business_Id: joi.number(),
          startDate: joi.date(),
          endDate: joi.date(),
          startTime: joi
            .string()
            .regex(/\b((1[0-2]|0?[0-9]):([0-5][0-9]) ([AaPp][Mm]))/),
          endTime: joi
            .string()
            .regex(/\b((1[0-2]|0?[0-9]):([0-5][0-9]) ([AaPp][Mm]))/),
        },
        validator: joi,
      },
    },
  },

  {
    method: "PUT",
    path: "/editavailability/{id}",
    handler: availabilityController.editAvailability,
    options: {
      tags: ["api", "BusinessAvailability"],
      notes: "Edit availability Api",
      description: "Edit availability Api",
      auth: false,
      validate: {
        options: {
          abortEarly: false,
        },
        payload: {
          startDate: joi.date(),
          endDate: joi.date(),
          startTime: joi
            .string()
            .regex(/\b((1[0-2]|0?[0-9]):([0-5][0-9]) ([AaPp][Mm]))/),
          endTime: joi
            .string()
            .regex(/\b((1[0-2]|0?[0-9]):([0-5][0-9]) ([AaPp][Mm]))/),
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
    path: "/deleteavailability",
    handler: availabilityController.delAvailability,
    options: {
      tags: ["api", "BusinessAvailability"],
      notes: "Delete availability Api",
      description: "Delete availability Api",
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
