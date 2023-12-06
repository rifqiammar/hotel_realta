"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      stock.hasMany(models.stock_photo, { foreignKey: "spho_stock_id", onDelete: "cascade" });
      stock.hasMany(models.stock_detail, { foreignKey: "stod_stock_id", onDelete: "cascade" });
      stock.hasMany(models.vendor_product, { foreignKey: "vepro_stock_id", onDelete: "cascade" });
      stock.hasMany(models.purchase_order_detail, { foreignKey: "pode_stock_id", onDelete: "cascade" });
    }
  }
  stock.init(
    {
      stock_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      stock_name: DataTypes.STRING,
      stock_description: DataTypes.STRING,
      stock_quantity: DataTypes.SMALLINT,
      stock_reorder_point: DataTypes.SMALLINT,
      stock_used: DataTypes.SMALLINT,
      stock_scrap: DataTypes.SMALLINT,
      stock_size: DataTypes.STRING,
      stock_color: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "stock",
    }
  );
  return stock;
};
