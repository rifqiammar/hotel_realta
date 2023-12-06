const { vendor_product, stock } = require("../../models");

const getVproduct = async (req, res) => {
  try {
    const vendorId = parseInt(req.query.vepro_vendor_id);
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 5;
    const offset = limit * page;

    const totalRows = await vendor_product.schema("purchasing").count({
      where: {
        vepro_vendor_id: vendorId,
      },
    });

    const totalPage = Math.ceil(totalRows / limit);

    const data = await vendor_product.schema("purchasing").findAll({
      include: {
        model: stock.schema("purchasing"),
        attributes: ["stock_name"],
      },
      where: {
        vepro_vendor_id: vendorId,
      },
      offset: offset,
      limit: limit,
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

const addVproduct = async (req, res) => {
  try {
    const { vepro_qty_stocked, vepro_qty_remaining, vepro_price, vepro_stock_id, vepro_vendor_id } = req.body;
    // Find Stock Name
    // const result = await stock.findOne({ where: { stock_name } });

    // console.log(result.stock_name);

    const data = await vendor_product.schema("purchasing").create({
      vepro_qty_stocked,
      vepro_qty_remaining,
      vepro_price,
      vepro_stock_id,
      vepro_vendor_id,
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

const updateVproduct = async (req, res) => {
  try {
    const { vepro_qty_stocked, vepro_qty_remaining, vepro_price, vepro_stock_id, vepro_vendor_id } = req.body;
    // Find Stock Name
    // const result = await stock.findOne({ where: { stock_name } });

    // console.log(result.stock_name);
    const id = +req.query.id;

    const data = await vendor_product.schema("purchasing").updates(
      {
        vepro_qty_stocked,
        vepro_qty_remaining,
        vepro_price,
        vepro_stock_id,
        vepro_vendor_id,
      },
      {
        where: { vepro_id: id },
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

const deleteVproduct = async (req, res) => {
  try {
    const id = +req.query.id;

    await vendor_product.schema("purchasing").destroy({
      where: { vepro_id: id },
    });

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

module.exports = { addVproduct, getVproduct, updateVproduct, deleteVproduct };
