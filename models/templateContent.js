const db = require(".");

const {Model,Sequelize} = require('sequelize');
const sequelize = new Sequelize('sqlite::memory');

module.exports = (sequelize, DataTypes) => {
    class templateContent extends Model{
        static associate(models){
            templateContent.belongsTo(models.language,{foreignKey:"language_id"})
             templateContent.belongsTo(models.template,{foreignKey:"template_id"})  
        }
    }
    templateContent.init({
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            allowNull : false,
            autoIncrement : true
        },
        template_id : {
            type : DataTypes.INTEGER
        },
        language_id : {
            type : DataTypes.INTEGER,
        },
        subject : {
            type : DataTypes.STRING,
        },
        templates : {
            type : DataTypes.STRING,
        },
        replacement : {
            type : DataTypes.STRING,
            allowNull : true
        }
    },{sequelize:sequelize,modelName:'templateContent',tableName:'template_Content'});

    return templateContent;
}