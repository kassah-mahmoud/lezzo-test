const { Store, Category } = require("../database/models");
const { getPaginationParams, getPaginationData } = require("../helpers.");

class StoreController {
  static async index(req, res) {
    const { page, size } = req.query;
    const { limit, offset } = getPaginationParams(page, size);

    try {
      const stores = await Store.findAndCountAll({
        limit,
        offset,
      });

      return res.json(getPaginationData(stores, limit, page));
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Something went wrong!" });
    }
  }

  static async store(req, res) {
    const { name } = req.body;
    const logo = req.file ? req.file.path : null;

    try {
      const newStore = await Store.create({
        name: name,
        logo: logo,
      });

      return res.json(newStore);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Something went wrong!" });
    }
  }

  static async show(req, res) {
    const id = req.params.id;
    console.log(id);
    try {
      const store = await Store.findOne({
        where: {
          id,
        },
        include: {
          model: Category,
          as: "categories",
          include: ["products"],
        },
      });

      return store
        ? res.json(store)
        : res.status(404).json({ message: "Requested resource not found" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Something went wrong!" });
    }
  }
}

module.exports = StoreController;
