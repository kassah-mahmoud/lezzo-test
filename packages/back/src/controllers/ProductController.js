const { Product } = require("../database/models");

class ProductController {
  static async store(req, res) {
    const { name, price, categoryId } = req.body;
    const image = req.file ? req.file.path : null;

    try {
      const newProduct = await Product.create({
        name,
        price,
        categoryId,
        image,
      });

      return res.json(newProduct);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Something went wrong!" });
    }
  }
}

module.exports = ProductController;
