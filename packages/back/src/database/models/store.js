"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Category }) {
      // define association here
      this.hasMany(Category, {
        foreignKey: { name: "storeId" },
        as: "categories",
        onDelete: "cascade",
        onUpdate: "cascade",
      });
    }
  }
  Store.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      logo: DataTypes.STRING,
    },
    {
      tableName: "stores",
      sequelize,
      modelName: "Store",
    }
  );
  return Store;
};
