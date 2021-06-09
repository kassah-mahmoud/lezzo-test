"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Category }) {
      // define association here
      this.belongsTo(Category, {
        foreignKey: {
          name: "categoryId",
          allowNull: false,
        },
        as: "category",
      });
    }
  }
  Product.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      image: { type: DataTypes.STRING, allowNull: false },
      price: { type: DataTypes.DOUBLE, allowNull: false },
    },
    {
      tableName: "products",
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
