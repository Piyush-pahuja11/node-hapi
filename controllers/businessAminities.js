const db = require("../models/index");

class businessAminities {
  getAminities = async (request) => {
    try {
      const aminities = await db.AminitiesList.findAll();
      return aminities;
    } catch (e) {
      console.log("ss", e);
    }
  };

  addAminities = async (request) => {
    try {
    /*   var aminities = [];
      for (let eachtag of request.payload.aminitiesItem) {
        aminities.push({ aminitiesItem: eachtag });
      }
      const add = await db.AminitiesList.bulkCreate(aminities, {
        ignoreDuplicates: true,
      }); */
      let uniqueAminites = [];

      for(let i =0; i < request.payload.aminitiesItem.length ; i ++){
        let checkAlreadyExist = await db.AminitiesList.findOne({
          where : {
            aminitiesItem : request.payload.aminitiesItem[i]
          }
        })

        if(!checkAlreadyExist){
          uniqueAminites.push({aminitiesItem :request.payload.aminitiesItem[i] })
        }
      }

      if(uniqueAminites && uniqueAminites.length == 0){
        return ('Aminities Already Exists');
      }

      const add = await db.AminitiesList.bulkCreate(uniqueAminites);
      return add;
    } catch (e) {
      console.log("##addaminties######", e);
    }
  };

  editAminities = async (request) => {
    try {
      const editAmini = await db.AminitiesList.update(
        {
          aminitiesItem: request.payload.aminitiesItem,
        },
        {
          where: {
            id: request.params.id,
          },
        }
      );
      return editAmini;
    } catch (e) {
      console.log("###edit####", e);
    }
  };

  deleteAminities = async (request) => {
    try {
      const delamini = await db.AminitiesList.destroy({
        where: {
          id: request.payload.id,
        },
      });
      return ("Deleted Successfully");
    } catch (e) {
      console.log("@@delete@@@", e);
    }
  };
}

module.exports = new businessAminities();
