const db = require(".");

const {Model,Sequelize} = require('sequelize');
const sequelize = new Sequelize('sqlite::memory');

module.exports = (sequelize, DataTypes) => {
    class template extends Model{
        static associate(models){
            template.hasMany(models.templateContent,{onDelete: 'cascade',foreignKey:"template_id"})
        }
    }
    template.init({
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            allowNull : false,
            autoIncrement : true
        },
        template_code : DataTypes.STRING
    },{sequelize:sequelize,modelName:'template'})
    return template;
}
