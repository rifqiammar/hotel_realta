const { stock, vendor_product } = require("../../models");

const getStockVendor = async (req, res) => {
  try {
    const data = await vendor_product.schema("purchasing").findAll({
      include: stock,
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

module.exports = { getStockVendor };
