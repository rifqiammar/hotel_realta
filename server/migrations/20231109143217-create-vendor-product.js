"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createSchema("purchasing");

    await queryInterface.createTable(
      "vendor_products",
      {
        vepro_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        vepro_qty_stocked: {
          type: Sequelize.INTEGER,
        },
        vepro_qty_remaining: {
          type: Sequelize.INTEGER,
        },
        vepro_price: {
          type: Sequelize.INTEGER,
        },
        vepro_stock_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          foreignKey: true,
          onDelete: "cascade",
          onUpdate: "cascade",
          references: {
            model: {
              tableName: "stocks",
              schema: "purchasing",
            },
            key: "stock_id",
          },
        },
        vepro_vendor_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          foreignKey: true,
          onDelete: "cascade",
          onUpdate: "cascade",
          references: {
            model: {
              tableName: "vendors",
              schema: "purchasing",
            },
            key: "vendor_entity_id",
          },
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        schema: "purchasing",
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("vendor_products");
  },
};
