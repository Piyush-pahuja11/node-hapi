const db = require("../models/index");

class businessSocialPlatform {
  getSocial = async (request) => {
    try {
      const getsocial = await db.SocialPlatform.findAll();
      return getsocial;
    } catch (e) {
      console.log("getsocial************", e);
    }
  };

  addSocial = async (request) => {
    try {
      const addsocial = await db.SocialPlatform.create({
        business_Id: request.payload.business_Id,
        platformName: request.payload.platformName,
        platformLink: request.payload.platformLink,
      });
      return addsocial;
    } catch (e) {
      console.log("addsocial#############", e);
    }
  };

  editSocial = async (request) => {
    try {
      const editsocial = await db.SocialPlatform.update(
        {
          platformName: request.payload.platformName,
          platformLink: request.payload.platformLink,
        },
        {
          where: {
            id: request.params.id,
          },
        }
      );
      return editsocial;
    } catch (e) {
      console.log("editsocial&&&**&**&*&*& ", e);
    }
  };

  delSocial = async (request) => {
    try {
      const delsocial = await db.SocialPlatform.destroy({
        where: {
          id: request.payload.id,
        },
      });
      return delsocial;
    } catch (e) {
      console.log("deletesocial)))))))))((((((((((()", e);
    }
  };
}

module.exports = new businessSocialPlatform();
