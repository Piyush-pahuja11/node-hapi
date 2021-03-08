const crypto = require("crypto");
const Jwt = require('jsonwebtoken');
const Constants = require('../config/constant');
// const Models = require('../models/index');
const db = require("../models/index")
const Moment = require('moment');
const joi = require("joi")

// Method to encrypt data(password).
const encrypt = (text) => {
	let cipher = crypto.createCipheriv(Constants.algorithm, Constants.key.privateKey, Constants.iv);
	let crypted = cipher.update(text, "utf8", "hex");
	crypted += cipher.final("hex");
	return crypted;
};



const decrypt = (text) => {
	//const iv = new Buffer(crypto.randomBytes(16));
	let decipher = crypto.createDecipheriv(Constants.algorithm, Constants.key.privateKey, Constants.iv);
	let dec = decipher.update(text, "hex", "utf8");
	dec += decipher.final("utf8");
	return dec;
};

exports.decryptData = async (text) => {
	//const iv = new Buffer(crypto.randomBytes(16));
	let decipher = crypto.createDecipheriv(Constants.algorithm, Constants.key.privateKey, Constants.iv);
	let dec = decipher.update(text, "hex", "utf8");
	dec += decipher.final("utf8");
	return dec;
};


const sessionExist = async (sessionId) =>{
	let data = await db.users.findOne(
		{where: {id : sessionId}}
	);
	return data;
};


// Method to validate token
exports.validateToken = async (token, request, h) => {
	console.log("inside validate token");
	try{
		let fetchtoken = JSON.parse(token.data);
		console.log(fetchtoken,"fetchtoken")
		var diff = Moment().diff(Moment(token.iat * 1000));
		if (diff > 0) {
			// const userInfo = await Models.users.findOne({
			// 	where: { id: fetchtoken.id }
			// });
			var userInfo =  await db.users.findOne({
				where:{
					id:fetchtoken.id
				}
			})
			let sessionCheck = await sessionExist(fetchtoken.id);
			if(!sessionCheck){
				return {
					isValid : false
				};
			}else{
				return{
					isValid : true,
					credentials: { userData: fetchtoken, scope: fetchtoken.scope }
				};
			} 	
		}
	}catch(e){
		console.log(e);
	}
};

// Method to Sign token with private key
exports.signToken = (tokenData) => {
	return Jwt.sign(
		{ data: JSON.stringify(tokenData) },
		//{data: tokenData},
		Constants.key.privateKey
	);
};
exports.verifyToken = (token) => {
	console.log(token,"token inside function")
	
	jwt.verify(token, Constants.key.privateKey, function(err, decoded) {

		console.log(decoded,"decoded");
		console.log(decoded.foo); // bar
	  });
	return {};
};

exports.headers = (optional) => {
    let Globalheaders = {};
    if (optional) {
      Globalheaders = {
            authorization: joi.string()
          .optional()
          .description(
                    "Token to identify user who is performing the action [optional]"
          ),
          language: joi.string().optional()
      };
    } else {
      Globalheaders = {
            authorization: joi.string()
          .required()
          .description("Token to identify user who is performing the action"),
          language: joi.string().optional()
      };
    }
  
    return Globalheaders;
};
// Method to update validation response from Joi
exports.updateFailureError = (err, req) => {
	const updatedError = err;
	updatedError.output.payload.message = [];
	let customMessages = {};

	if (err.isJoi && Array.isArray(err.details) && err.details.length > 0){
		err.details.forEach((error) => {
			customMessages[error.context.label] = [req.i18n.__(error.message)];
		});
	}else{
		let messageParts = err.message.split('|');
		customMessages[messageParts[0]] = req.i18n.__(messageParts[1]);
	}
	
	delete updatedError.output.payload.validation;
	updatedError.output.payload.error = "Bad Request";
	updatedError.output.payload.message = req.i18n.__(
		"ERROR_WHILE_VALIDATING_REQUEST"
	);
	//updatedError.output.payload.errors = req.i18n.__(modifyCustMessage);
	updatedError.output.payload.errors = customMessages;
	return updatedError;
};