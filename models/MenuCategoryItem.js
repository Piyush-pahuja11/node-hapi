const db = require(".");

const {Model,Sequelize} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    class MenuCategoryItem extends Model{
        static associate(models){
             
             /* business_hours.hasMany(models.business,{foreignKey:'business_hours_id'}) */ 
        }
    }MenuCategoryItem.init({ 
        menuCategory_Id:{
            type:DataTypes.INTEGER
        } ,
       price:{
          type:DataTypes.INTEGER
      },
      itemName:{
          type:DataTypes.STRING
      },
      itemDescription:{
          type:DataTypes.STRING
      },
      itemTags:{
          type:DataTypes.STRING
      },
      isRecommended:{
          type:DataTypes.STRING
      } 

    },{sequelize:sequelize,modelName:'MenuCategoryItem'})

    return MenuCategoryItem;
}