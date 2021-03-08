const db = require("../models/index");

class businessQuest {
  getQues = async (request) => {
    try {
      const quest = await db.Question.findAll();
      return quest;
    } catch (e) {
      console.log("&&&&getquestion", e);
    }
  };

  addQues = async (request) => {
    try {
      const addques = await db.Question.create({
        title: request.payload.title,
        business_Id: request.payload.business_Id,
      });
      return addques;
    } catch (e) {
      console.log("QAQQQQaddquestion", e);
    }
  };

  editQues = async (request) => {
    try {
      const editques = await db.Question.update(
        {
          title: request.payload.title,
        },
        {
          where: {
            id: request.params.id,
          },
        }
      );
      return editques;
    } catch (e) {
      console.log("Sssss########editquestion", e);
    }
  };

  delQues = async (request) => {
    try {
      const delQues = await db.Question.destroy({
        where: {
          id: request.payload.id,
        },
      });
      return delQues;
    } catch (e) {
      console.log("@@@@@@$$$$$$$deletequestion", e);
    }
  };
}

module.exports = new businessQuest();
