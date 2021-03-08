const db = require(".");

const {Model,Sequelize} = require('sequelize');
const sequelize = new Sequelize('sqlite::memory');

module.exports = (sequelize, DataTypes) => {
    class email extends Model{
        static associate(models){
            email.belongsToMany(models.attachment,{through:'email_attachment'  })
        }
    }email.init({
        emailFrom :{
            type:DataTypes.STRING
        },
        emailTo :{
            type:DataTypes.STRING
        },
        emailStatus:{
            type:DataTypes.STRING
        },
        languageCode:{
            type:DataTypes.STRING
        }
        
    },{sequelize:sequelize,modelName:'email'})

    return email;
}