const db = require("../models/index");

class businessAnswer {
  getAnswer = async (request) => {
    try {
      const answer = await db.Answer.findAll();
      return answer;
    } catch (e) {
      console.log("answerget", e);
    }
  };

  addAnswer = async (request) => {
    try {
      const addanswer = await db.Answer.create({
        answers: request.payload.answers,
        question_Id: request.payload.question_Id,
      });
      return addanswer;
    } catch (e) {
      console.log("addanswer", e);
    }
  };

  editAnswer = async (request) => {
    try {
      const editanswer = await db.Answer.update(
        {
          answers: request.payload.answers,
        },
        {
          where: {
            id: request.params.id,
          },
        }
      );
      return editanswer;
    } catch (e) {
      console.log("editanswer", e);
    }
  };

  delAnswer = async (request) => {
    try {
      const delanswer = await db.Answer.destroy({
        where: {
          id: request.payload.id,
        },
      });
      return delanswer;
    } catch (e) {
      console.log("delanswer", e);
    }
  };
}

module.exports = new businessAnswer();
