"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class stock_photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      stock_photo.belongsTo(models.stock, { foreignKey: "spho_stock_id" });
    }
  }
  stock_photo.init(
    {
      spho_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      spho_thumbnail_filename: DataTypes.STRING,
      spho_photo_filename: DataTypes.STRING,
      spho_primary: DataTypes.BOOLEAN,
      spho_url: DataTypes.STRING,
      spho_stock_id: {
        type: DataTypes.INTEGER,
        references: {
          schema: "purchasing",
          model: "stock",
          key: "stock_id",
        },
      },
    },
    {
      sequelize,
      modelName: "stock_photo",
    }
  );
  return stock_photo;
};
