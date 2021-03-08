const db = require(".");

const {Model,Sequelize} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    class AminitiesList extends Model{
        static associate(models){
           /*   AminitiesList.hasMany(models.Aminities,{foreignKey:'AmintiesList_Id'})  */  
             /* business_hours.hasMany(models.business,{foreignKey:'business_hours_id'}) */ 
        }
    }AminitiesList.init({  
     /*    business_Id:{
            type:DataTypes.INTEGER
        }, */
     aminitiesItem:{
          type:DataTypes.STRING,
      },
        
    },{sequelize:sequelize,modelName:'AminitiesList'})

    return AminitiesList;
}