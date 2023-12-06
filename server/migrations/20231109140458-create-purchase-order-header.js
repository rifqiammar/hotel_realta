"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createSchema("purchasing");

    await queryInterface.createTable(
      "purchase_order_headers",
      {
        pohe_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        pohe_number: {
          unique: true,
          type: Sequelize.STRING,
        },
        pohe_status: {
          type: Sequelize.CHAR,
        },
        pohe_order_date: {
          type: Sequelize.DATE,
        },
        pohe_subtotal: {
          type: Sequelize.INTEGER,
        },
        pohe_tax: {
          type: Sequelize.INTEGER,
        },
        pohe_total_amount: {
          type: Sequelize.INTEGER,
        },
        pohe_refund: {
          type: Sequelize.INTEGER,
        },
        pohe_arrival_date: {
          type: Sequelize.DATE,
        },
        pohe_pay_type: {
          type: Sequelize.CHAR,
        },
        pohe_emp_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          // foreignKey: true,
          // references: {
          //   model: {
          //     tableName: "employees",
          //   },
          //   key: "emp_id",
          // },
        },
        pohe_vendor_id: {
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
    await queryInterface.dropTable("purchase_order_headers");
  },
};
