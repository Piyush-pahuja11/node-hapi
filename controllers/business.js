const Sequelize = require("sequelize");
const db = require("../models/index");
const moment = require('moment')

class business {
  addBusiness = async (request) => {
    try {
      var availabilities = [];
      const newDate = new Date();
      const formatDate = moment(newDate).format("MM-DD-YYYY");
      const startTime = moment(`${formatDate} ${request.payload.startTime}`).format(
        "HH:mm:SS"
      );
      const endTime = moment(`${formatDate} ${request.payload.endTime}`).format(
        "HH:mm:SS"
      );
      if (request.payload.business_hour) {
        const newDate = new Date();
        const formatDate = moment(newDate).format("MM-DD-YYYY");
        for(var i=0;i<request.payload.business_hour.length;i++)
        {
        const ST = moment(`${formatDate} ${request.payload.business_hour[i].startTime}`).format("HH:mm:SS");
        const ET = moment(`${formatDate} ${request.payload.business_hour[i].endTime}`).format("HH:mm:SS");
        availabilities.push({
          startTime: ST,
          endTime: ET,
          startDate: request.payload.business_hour[i].startDate,
          endDate: request.payload.business_hour[i].endDate,
        });
      }
       
      }
      const data = await db.Business.create(
        {
          title: request.payload.title,
          subtitle: request.payload.subtitle,
          startTime: startTime,
          endTime: endTime,
          averageRating: request.payload.averageRating,
          totalRating: request.payload.totalRating,
          startingCost: request.payload.startingCost,
          EndingCost: request.payload.EndingCost,
          costPerPerson: request.payload.costPerPerson,
          Availabilities: availabilities,
          Questions: request.payload.questions,
          Menus: request.payload.menu,
          SocialPlatforms: request.payload.socialPlatform,
        },
        {
          include: [
            { model: db.Availability },
            { model: db.Question, include: [{ model: db.Answer }] },
            {
              model: db.Menu,
              include: [
                {
                  model: db.MenuCategory,
                  include: [{ model: db.MenuCategoryItem }],
                },
              ],
            },
            { model: db.SocialPlatform },
          ],
        }
      );

      //for AMINITIES
      let existdata = [];

      let uniqueAminites = [];
      var aminityId = [];
      var checkAlreadyExist;
      for (let i = 0; i < request.payload.amenities.aminitiesItem.length; i++) {
        checkAlreadyExist = await db.AminitiesList.findOne({
          where: {
            aminitiesItem: request.payload.amenities.aminitiesItem[i],
          },
        });

        if (checkAlreadyExist) {
          existdata.push(checkAlreadyExist);
        }
        if (!checkAlreadyExist) {
          uniqueAminites.push({
            aminitiesItem: request.payload.amenities.aminitiesItem[i],
          });
        }
      }

      if (existdata && existdata.length !== 0) {
        for (var j = 0; j < existdata.length; j++) {
          aminityId.push(existdata[j].dataValues.id);
        }
        data.setAminitiesLists(aminityId);
      }
      const adddata = await db.AminitiesList.bulkCreate(uniqueAminites);

      for (var i = 0; i < adddata.length; i++) {
        aminityId.push(adddata[i].dataValues.id);
      }
      data.setAminitiesLists(aminityId);



      //for TAGS

      let existdataTag = [];
      let alreadyExist = [];
      let uniqueTags = [];
      var tagId = [];
      var checkAlreadyExist;
      for (let i = 0; i <  request.payload.tags.tagName.length; i++) {
        checkAlreadyExist = await db.TagName.findOne({
          where: {
            tagName: request.payload.tags.tagName[i],
          },
        });

        if (checkAlreadyExist) {
          existdataTag.push(checkAlreadyExist);
        }
        if (!checkAlreadyExist) {
          uniqueTags.push({
            tagName: request.payload.tags.tagName[i],
          });
        }
      }

      if (existdataTag && existdataTag.length !== 0) {
        for (var j = 0; j < existdataTag.length; j++) {
          tagId.push(existdataTag[j].dataValues.id);
        }
        data.setTagNames(tagId);
      }
      const adddataTag = await db.TagName.bulkCreate(uniqueTags);

      for (var i = 0; i < adddataTag.length; i++) {
        tagId.push(adddataTag[i].dataValues.id);
      }
      data.setTagNames(tagId);


  

      return data;
    } catch (e) {
      console.log("err##############", e);
    }
  };

  editBusiness = async (request, h) => {
    try {
      const newDate = new Date();
      const formatDate = moment(newDate).format("MM-DD-YYYY");
      const startTime = moment(`${formatDate} ${request.payload.startTime}`).format(
        "HH:mm:SS"
      );
      const endTime = moment(`${formatDate} ${request.payload.endTime}`).format(
        "HH:mm:SS"
      );
      const editData = await db.Business.update(
        {

          title: request.payload.title,
          subtitle: request.payload.subtitle,
          startTime:startTime,
          endTime:endTime,
          averageRating: request.payload.averageRating,
          totalRating: request.payload.totalRating,
          startingCost: request.payload.startingCost,
          EndingCost: request.payload.EndingCost,
          costPerPerson: request.payload.costPerPerson,
        },
        {
          where: {
            id: request.params.id,
          },
        }
      );
      return h.response({
        responseData: {
          title: request.payload.title,
          subtitle: request.payload.subtitle,
          startTime: request.payload.startTime,
          endTime: request.payload.endTime,
          averageRating: request.payload.averageRating,
          totalRating: request.payload.totalRating,
          startingCost: request.payload.startingCost,
          EndingCost: request.payload.EndingCost,
          costPerPerson: request.payload.costPerPerson,
        },
      });
    } catch (e) {
      console.log("err", e);
    }
  };

  getBusiness = async (request) => {
    try {
      const data = await db.Business.findAndCountAll({
        include: [
          {
            required: false,
            model: Models.AminitiesList,
          },
          {
            required: false,
            model: Models.Availability,
          },
          {
            required: false,
            model: Models.Menu,
            include: [
              {
                required: false,
                model: Models.MenuCategory,
                include: [
                  {
                    required: false,
                    model: Models.MenuCategoryItem,
                  },
                ],
              },
            ],
          },
          {
            required: false,
            model: Models.Question,
            include: [
              {
                required: false,
                model: Models.Answer,
              },
            ],
          },
          {
            required: false,
            model: Models.SocialPlatform,
          },
          {
            required: false,
            model: Models.TagName,
          },
        ],
      });
      return data;
    } catch (e) {
      console.log("GET business", e);
    }
  };
}

module.exports = new business();
