const { vendor, vendor_product, stock, stock_photo } = require("../../models");
const { Op } = require("sequelize");

const getVendor = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 3;
    const search = req.query.search || "";
    const offset = limit * page;
    const priority = req.query.priority || "DESC";

    const totalRows = await vendor.schema("purchasing").count({
      where: {
        [Op.or]: [
          {
            vendor_name: {
              [Op.iLike]: "%" + search + "%",
            },
          },
        ],
      },
    });

    const totalPage = Math.ceil(totalRows / limit);

    const data = await vendor.schema("purchasing").findAll({
      where: {
        [Op.or]: [
          {
            vendor_name: {
              [Op.iLike]: "%" + search + "%",
            },
          },
        ],
      },
      offset: offset,
      limit: limit,
      order: [["vendor_priority", priority], ["vendor_entity_id"]],
    });

    res.status(200).json({
      message: "success",
      data,
      page: page,
      limit: limit,
      offset: offset,
      totalPage: totalPage,
      totalRows: totalRows,
    });
  } catch (error) {
    res.status(400).json({
      message: "failed",
      error: error.message,
    });
  }
};

const addVendor = async (req, res) => {
  try {
    const { vendor_name, vendor_active, vendor_priority, register_date, vendor_url } = req.body;

    // Delete AF Entity ID
    const entityId = Math.floor(Math.random() * 10 * 5);

    //insert DB
    const data = await vendor.schema("purchasing").create({
      vendor_entity_id: entityId,
      vendor_name,
      vendor_active,
      vendor_priority,
      vendor_weburl: vendor_url,
      vendor_register_date: register_date,
    });

    // Send response
    res.status(200).json({
      message: "success",
      data,
    });
  } catch (error) {
    res.status(400).json({
      message: "failed",
      error: error.message,
    });
  }
};

const updateVendor = async (req, res) => {
  try {
    const id = +req.query.id;

    const { vendor_name, vendor_active, vendor_priority, vendor_modified_date, vendor_url } = req.body;

    await vendor.schema("purchasing").update(
      { vendor_name, vendor_active, vendor_priority, vendor_modified_date, vendor_weburl: vendor_url },
      {
        where: { vendor_entity_id: id },
      }
    );

    res.status(200).json({
      message: "Success.",
    });
  } catch (error) {
    res.status(400).json({
      message: "Updated failed!.",
      error: error.message,
    });
  }
};

const deleteVendor = async (req, res) => {
  try {
    const id = +req.query.id;

    await vendor.schema("purchasing").destroy({
      where: { vendor_entity_id: id },
    });

    res.status(200).json({
      message: `Deleted success.`,
    });
  } catch (error) {
    res.status(400).json({
      message: `Deleted Failed.`,
      error: error.message,
    });
  }
};

const getGallery = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    const offset = limit * page;
    const urutan = req.query.urutan || "DESC";

    const totalRows = await vendor_product.schema("purchasing").count({
      include: {
        model: stock.schema("purchasing"),
        where: {
          [Op.or]: [
            {
              stock_name: {
                [Op.iLike]: "%" + search + "%",
              },
            },
          ],
        },
      },
    });

    const totalPage = Math.ceil(totalRows / limit);

    const data = await vendor_product.schema("purchasing").findAll({
      include: [
        {
          model: vendor.schema("purchasing"),
        },
        {
          model: stock.schema("purchasing"),
          where: {
            [Op.or]: [
              {
                stock_name: {
                  [Op.iLike]: "%" + search + "%",
                },
              },
            ],
          },
          include: {
            model: stock_photo.schema("purchasing"),
          },
        },
      ],

      offset: offset,
      // Edited
      limit: 10,
      order: [["vepro_price", urutan], ["vepro_id"]],
    });

    res.status(200).json({
      message: "success",
      data,
      page: page,
      limit: limit,
      offset: offset,
      totalPage: totalPage,
      totalRows: totalRows,
    });
  } catch (error) {
    res.status(400).json({
      message: "failed",
      error: error.message,
    });
  }
};

module.exports = { getVendor, addVendor, updateVendor, deleteVendor, getGallery };
