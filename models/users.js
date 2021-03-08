const db = require(".");
const {Model, Sequelize} = require('sequelize');


module.exports=(sequelize,DataTypes)=>{
    class users extends Model{
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
    users.init({
        firstName:{
            type:DataTypes.STRING,
            
        },
        lastName:{
            type:DataTypes.STRING
        },
        email:{
            type:DataTypes.STRING
        },
        countryCode:{
            type:DataTypes.STRING
        },
        contactNumber:{
            type:DataTypes.STRING
        },
        roleId:{
            type:DataTypes.INTEGER
        },
        wallet:{
            type:DataTypes.INTEGER,
            defaultValue:0,
        },
        status:{
            type:DataTypes.INTEGER,
            defaultValue:0,
        },
        parentId:{
            type:DataTypes.INTEGER,
            defaultValue:0,
        },
        email:{
            type:DataTypes.STRING,
            defaultValue:null,
        },
        password:{
            type:DataTypes.STRING,
            defaultValue:null,
        }

        
    },{sequelize:sequelize,modelName:'users'})

    return users
}