"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createSchema("purchasing");

    await queryInterface.createTable(
      "stocks",
      {
        stock_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        stock_name: {
          type: Sequelize.STRING,
        },
        stock_description: {
          type: Sequelize.STRING,
        },
        stock_quantity: {
          type: Sequelize.SMALLINT,
        },
        stock_reorder_point: {
          type: Sequelize.SMALLINT,
        },
        stock_used: {
          type: Sequelize.SMALLINT,
        },
        stock_scrap: {
          type: Sequelize.SMALLINT,
        },
        stock_size: {
          type: Sequelize.STRING,
        },
        stock_color: {
          type: Sequelize.STRING,
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
    await queryInterface.dropTable("stocks");
  },
};
