"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class vendor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here | relasi ke Payment
      // vendor.belongsTo(models.payment, { foreignKey: "vendor_entity_id" });
      vendor.hasMany(models.vendor_product, { foreignKey: "vepro_vendor_id", onDelete: "cascade" });
      vendor.hasMany(models.purchase_order_header, { foreignKey: "pohe_vendor_id", onDelete: "cascade" });
    }
  }
  vendor.init(
    {
      vendor_entity_id: {
        autoIncrement: false,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        // references: {
        //   model: "payment",
        //   key: "entity_id",
        // },
      },
      vendor_name: DataTypes.STRING,
      vendor_active: DataTypes.BOOLEAN,
      vendor_priority: DataTypes.BOOLEAN,
      vendor_weburl: DataTypes.STRING,
      vendor_register_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      vendor_modified_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "vendor",
    }
  );
  return vendor;
};
