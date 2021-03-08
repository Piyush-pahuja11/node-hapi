const db = require(".");

const {Model,Sequelize} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    class TagName extends Model{
        static associate(models){
           /*  TagName.hasMany(models.Tag,{foreignKey:'TagName_id'})  */
             
        }
    }TagName.init({  
        /*  business_Id:{
            type:DataTypes.INTEGER
        },  */
        tagName:{
            type:DataTypes.STRING,
            unique:true
        },
    
    },{sequelize:sequelize,modelName:'TagName'})

    return TagName;
}