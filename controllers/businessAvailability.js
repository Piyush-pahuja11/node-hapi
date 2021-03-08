const db = require("../models/index");
const moment = require('moment')

class businessAvailability {
  getAvailability = async (request) => {
    try {
      const getavail = await db.Availability.findAll();
      return getavail;
    } catch (e) {
      console.log("getavail", e);
    }
  };

  addAvailability = async (request) => {
    try {
      const newDate = new Date();
      const formatDate = moment(newDate).format("MM-DD-YYYY");
      const startTime = moment(
        `${formatDate} ${request.payload.startTime}`
      ).format("HH:mm:SS");
      const endTime = moment(`${formatDate} ${request.payload.endTime}`).format(
        "HH:mm:SS"
      );
      const addavail = await db.Availability.create({
        business_Id: request.payload.business_Id,
        startDate:request.payload.startDate,
        endDate:request.payload.endDate,
        startTime: startTime,
        endTime:endTime,
      });
      return addavail;
    } catch (e) {
      console.log("addavail", e);
    }
  };

  editAvailability = async (request) => {
    try {
      const newDate = new Date();
      const formatDate = moment(newDate).format("MM-DD-YYYY");
      const startTime = moment(
        `${formatDate} ${request.payload.startTime}`
      ).format("HH:MM:SS");
      const endTime = moment(`${formatDate} ${request.payload.endTime}`).format(
        "HH:MM:SS"
      );
      const editavail = await db.Availability.update(
        {
          startDate:request.payload.startDate,
          endDate:request.payload.endDate,
          startTime: startTime,
          endTime: endTime,
        },
        {
          where: {
            id: request.params.id,
          },
        }
      );
      return editavail;
    } catch (e) {
      console.log("editavail ", e);
    }
  };

  delAvailability = async (request) => {
    try {
      const delavail = await db.Availability.destroy({
        where: {
          id: request.payload.id,
        },
      });
      return delavail;
    } catch (e) {
      console.log("deleteavail", e);
    }
  };
}

module.exports = new businessAvailability();
