const joi = require("joi");
const Attachment = require("../controllers/businessAttachment");

module.exports = [
  {
    method: "POST",
    path: "/upload",
    handler: Attachment.handleFileUpload,
    options: {
      tags: ["api", "Attachment"],
      notes: "Upload Attachment Api",
      description: "Upload Attachment Api",
      auth: false,
      payload: {
        maxBytes: 10000000,
        output: "stream",
        parse: true,
        multipart: true,
        timeout: 60000,
      },
      validate: {
        options: {
          abortEarly: false,
        },
        payload: {
          filename: joi.any().meta({ swaggerType: "file" }),
        },

        validator: joi,
      },
      plugins: {
        "hapi-swagger": {
          payloadType: "form",
        },
      },
    },
  },
];
