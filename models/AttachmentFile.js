const db = require(".");

const {Model,Sequelize} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    class AttachmentFile extends Model{
        static associate(models){
           
           /*  AttachmentFile.hasMany(models.Attachment,{foreignKey:"AttachmentFile_id"}) */
        }
    }AttachmentFile.init({  
      
        Size :{
            type:DataTypes.STRING
        },
        FileName :{
            type:DataTypes.STRING
        },
        FilePath:{
            type:DataTypes.STRING
        },
        ThumbPath:{
            type:DataTypes.STRING
        },
        UniqueName:{
            type:DataTypes.STRING

        },
        Ext:{
            type:DataTypes.STRING
        }
 
    },{sequelize:sequelize,modelName:'AttachmentFile'})

    return AttachmentFile;
}