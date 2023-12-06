"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createSchema("purchasing");

    await queryInterface.createTable(
      "stock_photos",
      {
        spho_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        spho_thumbnail_filename: {
          type: Sequelize.STRING,
        },
        spho_photo_filename: {
          type: Sequelize.STRING,
        },
        spho_primary: {
          type: Sequelize.BOOLEAN,
        },
        spho_url: {
          type: Sequelize.STRING,
        },
        spho_stock_id: {
          type: Sequelize.INTEGER,
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
      },
      {
        schema: "purchasing",
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("stock_photos");
  },
};
