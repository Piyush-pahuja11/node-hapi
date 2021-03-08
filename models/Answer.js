const db = require(".");

const {Model,Sequelize} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    class Answer extends Model{
        static associate(models){
           /*  Answer.belongsTo(models.business_faq,{foreignKey:'answer_Id'}) */
            /*  businessAnswer.hasMany(models.business_,{foreignKey:'business_hours_id'})  */
        }
    }Answer.init({ 
        question_Id:{
            type:DataTypes.INTEGER
        } ,
      answers:{
          type:DataTypes.STRING,
      },
     
        
    },{sequelize:sequelize,modelName:'Answer'})

    return Answer;
}