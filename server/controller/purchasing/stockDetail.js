const { stock_detail, stock, purchase_order_header } = require("../../models");
const { Op } = require("sequelize");
const getDetailStock = async (req, res) => {
  try {
    const idStockDet = +req.query.idStockDet;

    console.log(idStockDet);

    // const page = parseInt(req.query.page) || 0;
    // const limit = parseInt(req.query.limit) || 3;
    // const search = req.query.search || "";
    // const offset = limit * page;
    // const urutan = req.query.urutan || "DESC";

    // const totalRows = await stock_detail.schema("purchasing").count({
    //   where: {
    //     stod_stock_id: id,
    //   },
    // });

    // const totalPage = Math.ceil(totalRows / limit);

    const data = await stock_detail.schema("purchasing").findAll({
      include: {
        model: purchase_order_header.schema("purchasing"),
      },
      where: {
        stod_stock_id: idStockDet,
      },
    });

    res.status(200).json({
      message: "success",
      data,
      // page: page,
      // limit: limit,
      // offset: offset,
      // totalPage: totalPage,
      // totalRows: totalRows,
    });
  } catch (error) {
    res.status(400).json({
      message: "failed",
      error: error.message,
    });
  }
};

// From Outside Module } module Hotel
// const searchFacilities = async (req, res) => {
//   try {
//     const { inputSearch } = req.body;
//     const data = await facilities.findAll({
//       where: { facilities: inputSearch },
//     });

//     res.status(200).json({
//       message: "success",
//       data,
//     });
//   } catch (error) {
//     res.status(400).json({
//       message: "failed",
//       error: error.message,
//     });
//   }
// };

const addDetailStock = async (req, res) => {
  try {
    const { stod_stock_id, stod_faci_id, stod_pohe_id, stod_status } = req.body;

    //insert DB
    const data = await stock_detail.schema("purchasing").create({
      stod_stock_id,
      stod_faci_id,
      stod_pohe_id,
      stod_status,
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

const deleteDataStockDetail = async (req, res) => {
  try {
    const idStockDet = +req.query.idStockDet;

    await stock_detail.schema("purchasing").destroy({
      where: { stod_id: idStockDet },
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

const editStatus = async (req, res) => {
  try {
    const id = +req.query.id;

    const { stod_status } = req.body;

    await stock_detail.schema("purchasing").update(
      { stod_status },
      {
        where: { stod_id: id },
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

module.exports = { getDetailStock, addDetailStock, deleteDataStockDetail, editStatus };

/*

input : id Facilities
input : status
input : Generate Barcode

*/
// Penambahan Library Validasi
