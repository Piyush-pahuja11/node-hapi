const { sequelize } = require("../models/index");
const db = require("../models/index");
const { tag } = require("./business");

class businessTags {
  addtag = async (request) => {
    try {

      let uniqueTags = [];

      for(let i =0; i < request.payload.tagName.length ; i ++){
        let checkAlreadyExist = await db.TagName.findOne({
          where : {
           tagName : request.payload.tagName[i]
          }
        })

        if(!checkAlreadyExist){
          uniqueTags.push({tagName:request.payload.tagName[i] })
        }
      }

      if(uniqueTags && uniqueTags.length == 0){
        return ('Aminities Already Exists');
      }

      const add = await db.TagName.bulkCreate(uniqueTags);
      return add;
    } catch (e) {
      console.log("RR&&&&&&&&&&addtag", e);
    }
  };

  gettag = async (request) => {
    try {
      const tag = await db.TagName.findAll();
      return tag;
    } catch (e) {
      console.log("ss%$^$^%##^,gettag", e);
    }
  };

  edittag = async (request) => {
    try {
      const tags = await db.TagName.update(
        {
          tagName: request.payload.tagName,
        },
        {
          where: {
            id: request.params.id,
          },
        }
      );
      return tags;
    } catch (e) {
      console.log("33*&*&*((*&^%^&*^&&edittag", e);
    }
  };

  deletetag = async (request) => {
    try {
      const tags = await db.TagName.destroy({
        where: {
          id: request.payload.id,
        },
      });
      return tags;
    } catch (e) {
      console.log("ee%%%%%%%%%%%$deletetag", e);
    }
  };
}

module.exports = new businessTags();
