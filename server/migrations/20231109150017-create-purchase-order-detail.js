"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createSchema("purchasing");

    await queryInterface.createTable(
      "purchase_order_details",
      {
        pode_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        pode_pohe_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          foreignKey: true,
          onDelete: "cascade",
          onUpdate: "cascade",
          references: {
            model: {
              tableName: "purchase_order_headers",
              schema: "purchasing",
            },
            key: "pohe_id",
          },
        },
        pode_order_qty: {
          type: Sequelize.SMALLINT,
        },
        pode_price: {
          type: Sequelize.INTEGER,
        },
        pode_line_total: {
          type: Sequelize.INTEGER,
        },
        pode_received_qty: {
          type: Sequelize.DECIMAL(8, 2),
        },
        pode_rejected_qty: {
          type: Sequelize.DECIMAL(8, 2),
        },
        pode_stocked_qty: {
          type: Sequelize.DECIMAL(9, 2),
        },
        pode_stock_id: {
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
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        pode_modified_date: {
          allowNull: true,
          type: Sequelize.DATE,
        },
      },
      {
        schema: "purchasing",
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("purchase_order_details");
  },
};
