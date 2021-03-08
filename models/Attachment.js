const db = require(".");

const {Model,Sequelize} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    class Attachment extends Model{
        static associate(models){

          
 
             /* business_hours.hasMany(models.business,{foreignKey:'business_hours_id'}) */ 
        }
    }Attachment.init({ 
    /*   business_Id:{
          type:DataTypes.INTEGER
      }, */
      AttachmentFile_id:{
        type:DataTypes.INTEGER
      },
   
    },{sequelize:sequelize,modelName:'Attachment'})

    return Attachment;
}