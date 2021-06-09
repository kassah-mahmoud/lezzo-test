const { Category } = require("../database/models");

class CategoryController {
  static async store(req, res) {
    const { name, storeId } = req.body;
    const image = req.file ? req.file.path : null;

    try {
      const newCategory = await Category.create({
        name,
        storeId,
        image,
      });

      return res.json(newCategory);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Something went wrong!" });
    }
  }
}

module.exports = CategoryController;
