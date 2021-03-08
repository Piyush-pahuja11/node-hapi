const db = require(".");

const {Model,Sequelize} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    class SocialPlatform extends Model{
        static associate(models){
           
             /* business_hours.hasMany(models.business,{foreignKey:'business_hours_id'}) */ 
        }
    }SocialPlatform.init({  
        business_Id:{
            type:DataTypes.INTEGER
        },
        platformName:{
            type:DataTypes.STRING,
        },
        platformLink:{
            type:DataTypes.STRING
        }
        
    },{sequelize:sequelize,modelName:'SocialPlatform'})

    return SocialPlatform;
}