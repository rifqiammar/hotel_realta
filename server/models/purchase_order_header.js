"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class purchase_order_header extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // purchase_order_header.belongsTo(models.employee, { foreignKey: "pohe_emp_id" });
      purchase_order_header.belongsTo(models.vendor, { foreignKey: "pohe_vendor_id" });
      purchase_order_header.hasOne(models.stock_detail, { foreignKey: "stod_pohe_id", onDelete: "cascade" });
      purchase_order_header.hasMany(models.purchase_order_detail, { foreignKey: "pode_pohe_id", onDelete: "cascade" });
    }
  }
  purchase_order_header.init(
    {
      pohe_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      pohe_number: { type: DataTypes.STRING, unique: true },
      pohe_status: DataTypes.CHAR,
      pohe_order_date: DataTypes.DATE,
      pohe_subtotal: DataTypes.INTEGER,
      pohe_tax: DataTypes.INTEGER,
      pohe_total_amount: DataTypes.INTEGER,
      pohe_refund: DataTypes.INTEGER,
      pohe_arrival_date: DataTypes.DATE,
      pohe_pay_type: DataTypes.CHAR,
      pohe_emp_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
        //   model: "employee",
        //   key: "emp_id",
        // },
      },
      pohe_vendor_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          schema: "purchasing",
          model: "vendor",
          key: "vendor_entity_id",
        },
      },
    },
    {
      sequelize,
      modelName: "purchase_order_header",
    }
  );
  return purchase_order_header;
};
