const db = require(".");

const {Model,Sequelize} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    class Availability extends Model{
        static associate(models){
           // Availability.belongsTo(models.Business,{foreignkey:'business_Id'}) 
        }
    }Availability.init({
        business_Id:{
            type : DataTypes.INTEGER,
        },
      startDate:{
          type:DataTypes.DATEONLY,
      },
      endDate:{
          type:DataTypes.DATEONLY
      },
      startTime:{
          type:DataTypes.TIME
      },
      endTime:{
        type:DataTypes.TIME
    },
        
    },{sequelize:sequelize,modelName:'Availability'})

    return Availability;
}