const db = require("../models/index");

class businessMenuCategoryItem {
  addCategoryItem = async (request) => {
    try {
      const data = db.MenuCategoryItem.create({
        menuCategory_Id: request.payload.menu_Id,
        price: request.payload.price,
        itemName: request.payload.itemName,
        itemDescription: request.payload.itemDescription,
        itemTags: request.payload.itemTags,
        isRecommended: request.payload.isRecommended,
      });

      return data;
    } catch (e) {
      console.log("adddCategoryitem######", e);
    }
  };

  getCategoryItem = async (request) => {
    try {
      const getitem = await db.MenuCategoryItem.findAll();
      return getitem;
    } catch (e) {}
  };

  editCategoryItem = async (request) => {
    try {
      const edititem = await db.MenuCategoryItem.update(
        {
          price: request.payload.price,
          itemName: request.payload.itemName,
          itemDescription: request.payload.itemDescription,
          itemTags: request.payload.itemTags,
          isRecommended: request.payload.isRecommended,
        },
        {
          where: {
            id: request.params.id,
          },
        }
      );
      return edititem;
    } catch (e) {
      console.log("editCategoryitem####", e);
    }
  };

  deleteCategoryItem = async (request) => {
    try {
      const delitem = await db.MenuCategoryItem.destroy({
        where: {
          id: request.payload.id,
        },
      });
      return delitem;
    } catch (e) {
      console.log("@@@@@@deleteCategoryItem", e);
    }
  };
}

module.exports = new businessMenuCategoryItem();
