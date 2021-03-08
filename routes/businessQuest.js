const joi = require("joi");
const questController = require("../controllers/businessQuest");

module.exports = [
  {
    method: "GET",
    path: "/getquestion",
    handler: questController.getQues,
    options: {
      tags: ["api", "BusinessQuestions"],
      notes: "Get Question Api",
      description: "Get Question Api",
      auth: false,
    },
  },

  {
    method: "POST",
    path: "/addquestion",
    handler: questController.addQues,
    options: {
      tags: ["api", "BusinessQuestions"],
      notes: "Add Question Api",
      description: "Add Question Api",
      auth: false,
      validate: {
        options: {
          abortEarly: false,
        },
        payload: {
          title: joi
            .string()
            .required()
            .error((errors) => {
              errors.forEach((err) => {
                switch (err.code) {
                  case "any.required":
                    err.message = "Question is required";
                    break;
                }
              });
              return errors;
            }),
          business_Id: joi.number(),
        },
        validator: joi,
      },
    },
  },

  {
    method: "PUT",
    path: "/editquestion/{id}",
    handler: questController.editQues,
    options: {
      tags: ["api", "BusinessQuestions"],
      notes: "Edit Question Api",
      description: "Edit Question Api",
      auth: false,
      validate: {
        options: {
          abortEarly: false,
        },
        payload: {
          title: joi.string(),
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
    path: "/deletequestion",
    handler: questController.delQues,
    options: {
      tags: ["api", "BusinessQuestions"],
      notes: "Delete Question Api",
      description: "Delete Question Api",
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
