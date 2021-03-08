const db = require(".");

const {Model,Sequelize} = require('sequelize');
/* const sequelize = new Sequelize('sqlite::memory'); */


module.exports=(sequelize,DataTypes)=>{
    class Business extends Model{
        static associate(models){
            Business.belongsToMany(models.AminitiesList,{foreignKey:'business_Id',through:'businessAminities'})  
            Business.hasMany(models.Question,{foreignKey:'business_Id'})  
            Business.hasMany(models.Menu,{foreignKey:'business_Id'}) 
            Business.hasMany(models.Availability,{foreignKey:'business_Id'}) 
            Business.hasMany(models.SocialPlatform,{foreignKey:'business_Id'}) 
            Business.belongsToMany(models.TagName,{foreignKey:'business_Id',through:'businessTags'}) 
            /* Business.hasMany(models.AttachmentFile,{foreignKey:'attachment_id'})  */
        }
    }
    Business.init({
        title:{
            type:DataTypes.STRING
        },
        subtitle:{
            type:DataTypes.STRING
        },
        startTime:{
            type:DataTypes.TIME
        },
        endTime:{
            type:DataTypes.TIME
        },
        averageRating:{
            type:DataTypes.INTEGER
        },
        totalRating:{
            type:DataTypes.INTEGER
        },
        startingCost:{
            type:DataTypes.STRING
        },
        EndingCost:{
            type:DataTypes.STRING
        },
        costPerPerson:{
            type:DataTypes.STRING
        },
      /*   attachment_id:{
            type:DataTypes.INTEGER
        } */
      
    },{sequelize:sequelize,modelName:'Business'})
return Business;
}


