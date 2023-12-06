"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class purchase_order_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      purchase_order_detail.belongsTo(models.purchase_order_header, { foreignKey: "pode_pohe_id", onDelete: "cascade" });
      purchase_order_detail.belongsTo(models.stock, { foreignKey: "pode_pohe_id", onDelete: "cascade" });
    }
  }
  purchase_order_detail.init(
    {
      pode_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      pode_pohe_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: {
          schema: "purchasing",
          model: "purchase_order_header",
          key: "pohe_id",
        },
      },
      pode_order_qty: DataTypes.SMALLINT,
      pode_price: DataTypes.INTEGER,
      pode_line_total: DataTypes.INTEGER,
      pode_received_qty: DataTypes.DECIMAL(8, 2),
      pode_rejected_qty: DataTypes.DECIMAL(8, 2),
      pode_stocked_qty: DataTypes.DECIMAL(9, 2),
      pode_stock_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          schema: "purchasing",
          model: "stock",
          key: "stock_id",
        },
      },
      pode_modified_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "purchase_order_detail",
    }
  );
  return purchase_order_detail;
};
