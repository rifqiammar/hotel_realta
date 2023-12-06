"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class vendor_product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      vendor_product.belongsTo(models.vendor, { foreignKey: "vepro_vendor_id" });
      vendor_product.belongsTo(models.stock, { foreignKey: "vepro_stock_id", ondelete: "cascade" });
    }
  }
  vendor_product.init(
    {
      vepro_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      vepro_qty_stocked: DataTypes.INTEGER,
      vepro_qty_remaining: DataTypes.INTEGER,
      vepro_price: DataTypes.INTEGER,
      vepro_stock_id: {
        type: DataTypes.INTEGER,
        references: {
          schema: "purchasing",
          model: "stock",
          key: "stock_id",
        },
      },
      vepro_vendor_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "vendor",
          key: "vendor_entity_id",
        },
      },
    },
    {
      sequelize,
      modelName: "vendor_product",
    }
  );
  return vendor_product;
};
