const businessController = require("../controllers/business");
const joi = require("joi");

module.exports = [
  {
    method: "POST",
    path: "/createBusiness",
    handler: businessController.addBusiness,
    options: {
      tags: ["api", "Business"],
      notes: "Add Business Api",
      description: "Add Business Api",
      auth: false,
      validate: {
        options: {
          abortEarly: false,
        },
        payload: {
          title: joi.string(),
          subtitle: joi.string(),
          startTime: joi.string().regex(/\b((1[0-2]|0?[0-9]):([0-5][0-9]) ([AaPp][Mm]))/),
          endTime: joi.string().regex(/\b((1[0-2]|0?[0-9]):([0-5][0-9]) ([AaPp][Mm]))/),    
          averageRating: joi.number(),
          totalRating: joi.number(),
          startingCost: joi.number(),
          EndingCost: joi.number(),
          costPerPerson: joi.number(),
          questions: joi.array().items(
            joi.object({
              title: joi.string(),
              Answers: joi.array().items(
                joi.object({
                  answers: joi.string(),
                })
              ),
            })
          ),
          business_hour: joi.array().items(
            joi.object({
              startDate: joi.date(),
              endDate: joi.date(),
              startTime: joi
                .string()
                .regex(/\b((1[0-2]|0?[0-9]):([0-5][0-9]) ([AaPp][Mm]))/),
              endTime: joi
                .string()
                .regex(/\b((1[0-2]|0?[0-9]):([0-5][0-9]) ([AaPp][Mm]))/),
                })
          ),

          tags: joi.object({
            tagName: joi.array().items(joi.string()),
          }),
          amenities: joi.object({
            aminitiesItem: joi.array().items(joi.string()),
          }),

          menu: joi.array().items(
            joi.object({
              title: joi.string(),
              MenuCategories: joi.array().items(
                joi.object({
                  name: joi.string(),
                  MenuCategoryItems: joi.array().items(
                    joi.object({
                      price: joi.number(),
                      itemName: joi.string(),
                      itemDescription: joi.string(),
                      itemTags: joi.string(),
                      isRecommended: joi.string(),
                    })
                  ),
                })
              ),
            })
          ),
          socialPlatform: joi.object({
            platformName: joi.string(),
            platformLink: joi.string(),
          }),
        },

        validator: joi,
      },
    },
  },

  {
    method: "PUT",
    path: "/editBusiness/{id}",
    handler: businessController.editBusiness,
    options: {
      tags: ["api", "Business"],
      notes: "Edit Business Api",
      description: "Edit Business Api",
      auth: false,
      validate: {
        options: {
          abortEarly: false,
        },
        payload: {
          title: joi.string(),
          subtitle: joi.string(),
          startTime: joi.string(),
          endTime: joi.string(),
          averageRating: joi.number(),
          totalRating: joi.number(),
          startingCost: joi.number(),
          EndingCost: joi.number(),
          costPerPerson: joi.number(),
        },
        params: {
          id: joi.number(),
        },
        validator: joi,
      },
    },
  },

  {
    method: "GET",
    path: "/getBusiness",
    handler: businessController.getBusiness,
    options: {
      tags: ["api", "Business"],
      notes: "Get Business Api",
      description: "Get Business Api",
      auth: false,
      validate: {
        options: {
          abortEarly: false,
        },
      },
    },
  },
];
