const db = require(".");

const {Model,Sequelize} = require('sequelize');
const sequelize = new Sequelize('sqlite::memory');

module.exports = (sequelize, DataTypes) => {
    class language extends Model{
        static associate(models){
            language.hasMany(models.templateContent,{onDelete: 'cascade',foreignKey:"language_id"})
        }
    }language.init({
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            allowNull : false,
            autoIncrement : true
        },
        code : {
            type : DataTypes.STRING,
            allowNull : false
        },
        name : {
            type : DataTypes.STRING,
            allowNull : false
        },
        default : {
            type : DataTypes.STRING,
            allowNull : false
        }
    },{sequelize:sequelize,modelName:'language'})

    return language;
}
