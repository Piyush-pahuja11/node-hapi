const db = require(".");

const {Model,Sequelize} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    class Question extends Model{
        static associate(models){
            Question.hasMany(models.Answer,{foreignKey:'question_Id'}) 
            /* business_question.hasMany(models.business_faq,{foreignKey:'question_Id'}) */
        }
    }Question.init({  
        business_Id:{
            type:DataTypes.INTEGER
        },
      title:{
          type:DataTypes.STRING,
      },
     
        
    },{sequelize:sequelize,modelName:'Question'})

    return Question;
}