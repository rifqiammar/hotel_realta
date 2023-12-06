"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class stock_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      stock_detail.belongsTo(models.stock, { foreignKey: "stod_stock_id" });
      stock_detail.belongsTo(models.purchase_order_header, { foreignKey: "stod_pohe_id" });
    }
  }
  stock_detail.init(
    {
      stod_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      stod_stock_id: {
        type: DataTypes.INTEGER,
        references: {
          schema: "purchasing",
          model: "stock",
          key: "stock_id",
        },
      },
      stod_barcode_number: { type: DataTypes.STRING, unique: true, allowNull: true },
      stod_status: DataTypes.CHAR,
      stod_notes: DataTypes.TEXT,
      stod_faci_id: {
        type: DataTypes.INTEGER,
        // references: {
        //   model: "facilities",
        //   key: "hofa_faci_id",
        // },
      },
      stod_pohe_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "purchase_order_header",
          key: "pohe_id",
        },
      },
    },
    {
      sequelize,
      modelName: "stock_detail",
    }
  );
  return stock_detail;
};
