const { stock, vendor_product } = require("../../models");
const { Op } = require("sequelize");

const getStock = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 3;
    const search = req.query.search || "";
    const offset = limit * page;
    const urutan = req.query.urutan || "DESC";

    const totalRows = await stock.schema("purchasing").count({
      where: {
        [Op.or]: [
          {
            stock_name: {
              [Op.iLike]: "%" + search + "%",
            },
          },
        ],
      },
    });

    const totalPage = Math.ceil(totalRows / limit);

    const data = await stock.schema("purchasing").findAll({
      where: {
        [Op.or]: [
          {
            stock_name: {
              [Op.iLike]: "%" + search + "%",
            },
          },
        ],
      },
      offset: offset,
      limit: limit,
      order: [["stock_quantity", urutan], ["stock_reorder_point", urutan], ["stock_reorder_point", urutan], ["stock_reorder_point", urutan], ["stock_id"]],
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

const searchStock = async (req, res) => {
  try {
    const search = req.query.search || "";

    const data = await stock.schema("purchasing").findAll({
      where: {
        [Op.or]: [
          {
            stock_name: {
              [Op.iLike]: "%" + search + "%",
            },
          },
        ],
      },
      limit: 1,
    });

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

const addStock = async (req, res) => {
  try {
    const { stock_name, stock_description, stock_quantity, stock_reorder_point, stock_used, stock_scrap, stock_size, stock_color } = req.body;

    const data = await stock.schema("purchasing").create({
      stock_name,
      stock_quantity,
      stock_reorder_point,
      stock_used,
      stock_size,
      stock_scrap,
      stock_color,
      stock_description,
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

const updateStock = async (req, res) => {
  try {
    const id = +req.query.id;

    const { stock_name, stock_quantity, stock_reorder_point, stock_used, stock_scrap, stock_size, stock_color } = req.body;

    const data = await stock.schema("purchasing").update(
      {
        stock_name,
        stock_quantity,
        stock_reorder_point,
        stock_used,
        stock_size,
        stock_scrap,
        stock_color,
      },
      {
        where: { stock_id: id },
      }
    );

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

const deleteStock = async (req, res) => {
  try {
    const id = +req.query.id;

    await stock.schema("purchasing").destroy(
      {
        where: { stock_id: id },
      },
      {
        include: [vendor_product],
      }
    );

    res.status(200).json({
      message: `Deleted success.`,
    });
  } catch (error) {
    res.status(400).json({
      message: "failed",
      error: error.message,
    });
  }
};
module.exports = { addStock, getStock, updateStock, deleteStock, searchStock };
