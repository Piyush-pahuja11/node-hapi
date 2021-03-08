const joi = require("joi");
const answerController = require('../controllers/businessAnswer')

module.exports=[

    {
        method: "GET",
        path: "/getanswer",
        handler: answerController.getAnswer,
        options: {
          tags: ["api", "BusinessAnswers"],
          notes: "Get Answers Api",
          description: "Get Answers Api",
          auth: false,
        },
      },

      {
        method: "POST",
        path: "/addanswer",
        handler: answerController.addAnswer,
        options: {
          tags: ["api", "BusinessAnswers"],
          notes: "Add Answer Api",
          description: "Add Answer Api",
          auth: false,
          validate: {
            options: {
              abortEarly: false,
            },
            payload: {
              question_Id:joi.number().required(),
              answers: joi.string().required(),
            },
            validator: joi,
          },
      
        },
      },

      {
        method: "PUT",
        path: "/editanswer/{id}",
        handler: answerController.editAnswer,
        options: {
          tags: ["api", "BusinessAnswers"],
          notes: "Edit Answer Api",
          description: "Edit Answer Api",
          auth: false,
          validate: {
            options: {
              abortEarly: false,
            },
            payload: {
              answers: joi.string().required(),
            },
            params:{
                id:joi.number().required()
            },
            validator: joi,
          },
        },
      },

      {
        method: "DELETE",
        path: "/deleteanswer",
        handler: answerController.delAnswer,
        options: {
          tags: ["api", "BusinessAnswers"],
          notes: "Delete Answer Api",
          description: "Delete Answer Api",
          auth: false,
          validate: {
            options: {
              abortEarly: false,
            },
            payload: {
              id: joi.number().required(),
            },
            validator: joi,
          },
        },
      },
]

