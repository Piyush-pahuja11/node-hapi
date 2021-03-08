const db = require("../models/index");

class businessMenu {
  addMenu = async (request) => {
    try {
      const menu = await db.Menu.create({
        business_Id: request.payload.business_Id,
        title: request.payload.title,
      });
      return menu;
    } catch (e) {
      console.log("menu", e);
    }
  };
}

module.exports = new businessMenu();
