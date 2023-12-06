"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createSchema("purchasing");

    await queryInterface.createTable(
      "vendors",
      {
        vendor_entity_id: {
          allowNull: false,
          primaryKey: true,
          // foreignKey: true,
          // references: {
          //   model: {
          //     tableName: "payments",
          //   },
          //   key: "entity_id",
          // },
          type: Sequelize.INTEGER,
        },
        vendor_name: {
          type: Sequelize.STRING,
        },
        vendor_active: {
          type: Sequelize.BOOLEAN,
        },
        vendor_priority: {
          type: Sequelize.BOOLEAN,
        },
        vendor_weburl: {
          type: Sequelize.STRING,
        },
        vendor_register_date: {
          allowNull: false,
          type: Sequelize.DATEONLY,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        vendor_modified_date: {
          allowNull: true,
          type: Sequelize.DATEONLY,
        },
      },
      {
        schema: "purchasing",
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("vendors");
  },
};
