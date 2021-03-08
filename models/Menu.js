const db = require(".");

const {Model,Sequelize} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    class Menu extends Model{
        static associate(models){
          

            Menu.hasMany(models.MenuCategory,{foreignKey:'menu_Id'})  
             /* business_hours.hasMany(models.business,{foreignKey:'business_hours_id'}) */ 
        }
    }Menu.init({ 
      business_Id:{
          type:DataTypes.INTEGER
      },
      title:{
        type:DataTypes.STRING
      },
   
    },{sequelize:sequelize,modelName:'Menu'})

    return Menu;
}