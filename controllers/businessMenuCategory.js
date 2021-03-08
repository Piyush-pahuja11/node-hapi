const db = require("../models/index");

class businessMenuCategory {
  addCategory = async (request) => {
    try {
      const data = db.MenuCategory.create({
        menu_Id: request.payload.menu_Id,
        name: request.payload.name,
      });

      return data;
    } catch (e) {
      console.log("33", e);
    }
  };

  getCategory = async (request) => {
    try {
      const getcate = await db.MenuCategory.findAll();
      return getcate;
    } catch (e) {}
  };

  editCategory = async (request) => {
    try {
      const editcategory = await db.MenuCategory.update(
        {
          name: request.payload.name,
        },
        {
          where: {
            id: request.params.id,
          },
        }
      );
      return editcategory;
    } catch (e) {
      console.log("editcategory ", e);
    }
  };

  deleteCategory = async (request) => {
    try {
      const delcate = await db.MenuCategory.destroy({
        where: {
          id: request.payload.id,
        },
      });
      return delcate;
    } catch (e) {
      console.log("@@@@@@", e);
    }
  };
}

module.exports = new businessMenuCategory();
