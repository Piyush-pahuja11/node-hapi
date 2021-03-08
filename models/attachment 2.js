const db = require(".");

module.exports=(sequelize,DataTypes)=>{
    const attachment = sequelize.define("attachment",{
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
    })
    return attachment;
}