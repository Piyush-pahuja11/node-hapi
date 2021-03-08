require("dotenv").config();
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const db = require("../models");

class Email{
Email = async (request) => {
  try{
  let Transport = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    secure: false,
    port: process.env.NODEMAILER_PORT,
    // auth: {
    //   user: process.env.NODEMAILER_USERNAME,
    //   pass: process.env.NODEMAILER_PASSWORD,
    // },
  });
/* 
  var lng = await db.language.findAll({
    where: { code:request.headers.language}
  });
  const temp = await db.template.findAll({
    where: {template_code:request.payload.code}
  });

  if(lng==null)
    {
     var lng =await db.Language.findAll({where:{code:'en'}})
    }
  const template = await db.templateContent.findAll({
      where:{language_id:lng[0].dataValues.id}
  }) */
  var lng = await db.language.findAll({
    where: { code:request.headers.language ? request.headers.language :'en' }
  });
  console.log('ssssssssssssssssssssssss',lng)
  //console.log('@@@@@@@@@@@@@@@@@@@',request.payload.code)

  const temp = await db.template.findAll({
    where:{templateCode:scope}
  });
  console.log('SSSSSSSSSSSSSSSSSSSSS',temp)

  const template = await db.templateContent.findOne({
    where:{templateId:temp[0].dataValues.id}
  })
  console.log("SSSSSSSSSSSSSSSSSSSSSSSSS",template)
  if (!template) {
    return request.i18n.__("message");
  }
  if (template)
   {
      /*   const templateLang = template.filter((l) => {
        return l.dataValues.template_id == temp[0].dataValues.id;
    }); */
    
    var html = template.dataValues.templates;
    var Finaltemplate = handlebars.compile(html);
    var replacements = {
      name: 'dadd',
    };

    const attach = await db.attachment.findAll();
    var attachments=[];
    var attachmentId=[];
    for(var i=0;i<attach.length;i++){
        console.log('sssssssssss',attach[i].dataValues)
        attachments.push({filename:attach[i].dataValues.FileName, path: attach[i].dataValues.FilePath})
        attachmentId.push(attach[i].dataValues.id)

    }
    const htmlToSend = Finaltemplate(replacements);
    var mailOptions = Transport.sendMail({
      from: request.payload.emailFrom,
      to: request.payload.emailTo,
      subject: "test subject",
      html: htmlToSend,
      attachments: attachments
    })
      .then(async(res) => {
        console.log(res);
        const emails = await db.email.create({
          emailFrom: request.payload.emailFrom,
          emailTo: request.payload.emailTo,
          emailStatus: "Sent",
          languageCode: request.headers.language
        });
        emails.setAttachments(attachmentId)
        return "Email Sent Succesfully"
      })
      .catch(async(err) => {
        const emails = await db.email.create({
          emailFrom: request.payload.emailFrom,
          emailTo: request.payload.emailTo,
          emailStatus: "Failure",
          languageCode: request.headers.language
        });
        return "Something Went Wrong";
      });
  }
  
  return mailOptions
  
  
}catch(e){
  return "something went wrong";
}
  
}
}

// emaildata = async (res, request, attachmentId) => {
//   const emails = await db.email.create({
//     emailFrom: request.payload.emailFrom,
//     emailTo: request.payload.emailTo,
//     emailStatus: res.messageId ? "Sent" : res ? "Failed" : "",
//     languageCode: request.headers.language
//   });
//   if(attachmentId !== null){
//     emails.setAttachments(attachmentId)
//   }

  
// }

module.exports=new Email()