const db = require(".");
const {Model, Sequelize} = require('sequelize');


module.exports=(sequelize,DataTypes)=>{
    class roles extends Model{
        static associate(models){
                // event.belongsToMany(models.aminitiesList,{foreignKey:"event_id", through:"eventAmenities"})
                // event.hasMany(models.booking,{foreignKey:"event_id"})
                // event.hasMany(models.availability,{foreignKey:"event_id"})
                // event.hasMany(models.ticket,{onDelete:'cascade',foreignKey:'event_id'})
                // event.belongsTo(models.attachments,{foreignKey:"attachment_id"})   
                // event.hasMany(models.eventGallery,{foreignKey:"event_id"})
                // event.belongsTo(models.users,{foreignKey:"user_id"})
                // event.belongsTo(models.eventCategory,{onDelete:'cascade',foreignKey:"category_id"})
                // event.hasMany(models.eventRating,{onDelete:'cascade',foreignKey:"event_id"})
        }
    }
    roles.init({
        name:{
            type:DataTypes.STRING
        },
       
        
    },{sequelize:sequelize,modelName:'roles'})

    return roles
}