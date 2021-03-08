const db = require(".");

const {Model,Sequelize} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    class MenuCategory extends Model{
        static associate(models){
             MenuCategory.hasMany(models.MenuCategoryItem,{foreignKey:"menuCategory_Id"})
             /* business_hours.hasMany(models.business,{foreignKey:'business_hours_id'}) */ 
        }
    }MenuCategory.init({  
        menu_Id:{
            type:DataTypes.INTEGER
        },
      name:{
          type:DataTypes.STRING,
      },
     /*  price:{
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
      } */

    },{sequelize:sequelize,modelName:'MenuCategory'})

    return MenuCategory;
}