"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createSchema("purchasing");

    await queryInterface.createTable(
      "stock_details",
      {
        stod_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        stod_stock_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
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
        stod_barcode_number: {
          allowNull: true,
          type: Sequelize.STRING,
          unique: true,
        },
        stod_status: {
          type: Sequelize.CHAR,
        },
        stod_notes: {
          type: Sequelize.TEXT,
        },
        stod_faci_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          // foreignKey: true,
          // references: {
          //   model: {
          //     tableName: "facilities",
          //   },
          //   key: "hofa_faci_id",
          // },
        },
        stod_pohe_id: {
          allowNull: true,
          type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("stock_details");
  },
};
