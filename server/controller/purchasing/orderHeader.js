const { purchase_order_header, vendor, stock, purchase_order_detail, vendor_product, stock_detail } = require("../../models");
const { Op } = require("sequelize");

const getDataOrderHeader = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    const offset = limit * page;
    const status = req.query.status || "";

    const totalRows = await purchase_order_header.schema("purchasing").count({
      include: {
        model: vendor.schema("purchasing"),
        where: {
          [Op.or]: [
            {
              vendor_name: {
                [Op.iLike]: "%" + search + "%",
              },
            },
          ],
        },
      },
      where: {
        [Op.or]: [
          {
            pohe_status: {
              [Op.iLike]: "%" + status + "%",
            },
          },
        ],
      },
    });

    const totalPage = Math.ceil(totalRows / limit);

    const data = await purchase_order_header.schema("purchasing").findAll({
      include: {
        model: vendor.schema("purchasing"),
        where: {
          [Op.or]: [
            {
              vendor_name: {
                [Op.iLike]: "%" + search + "%",
              },
            },
          ],
        },
      },
      where: {
        [Op.or]: [
          {
            pohe_status: {
              [Op.iLike]: "%" + status + "%",
            },
          },
        ],
      },
      offset: offset,
      limit: limit,
      // order: ["stock_quantity", urutan],
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

const addDataOrderHeader = async (req, res) => {
  try {
    const { pode_line_total, pode_stock_id, pode_price, pode_order_qty, pohe_subtotal, pohe_tax, pohe_total_amount, pohe_emp_id, pohe_vendor_id, pohe_status } = req.body;

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const date = String(today.getDate()).padStart(2, "0");

    // Kode unik, bisa dihasilkan dari bilangan acak
    const uniqueCode = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");

    const poNumber = `PO-${year}-${month}-${date}-${uniqueCode}`;

    const poData = await purchase_order_header.schema("purchasing").findOne({
      where: {
        pohe_number: poNumber,
      },
    });

    if (poData) {
      poNumber = `PO-${year}-${month}-${date}-${uniqueCode}`;
    }

    const data = await purchase_order_header.schema("purchasing").create({
      pohe_number: poNumber,
      pohe_order_date: today,
      pohe_subtotal,
      pohe_tax,
      pohe_total_amount,
      pohe_emp_id,
      pohe_vendor_id,
      pohe_status,
      pode_stock_id,
      pode_price,
      pode_order_qty,
    });

    await purchase_order_detail.schema("purchasing").create({
      pode_pohe_id: data.pohe_id,
      pode_stock_id,
      pode_price,
      pode_order_qty,
      pode_line_total,
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

const deleteDataOrderHeader = async (req, res) => {
  try {
    const idOrder = req.query.idOrder;

    await purchase_order_header.schema("purchasing").destroy({
      where: { pohe_number: idOrder },
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

const switchOrder = async (req, res) => {
  try {
    const idOrder = req.query.idOrder;

    const { pohe_status } = req.body;

    await purchase_order_header.schema("purchasing").update(
      { pohe_status },
      {
        where: { pohe_number: idOrder },
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

const getDataOrderDetail = async (req, res) => {
  try {
    const pohe_number = req.query.ponumber;

    // const data = await purchase_order_detail.schema("purchasing").findAll({
    //   include: [
    //     {
    //       model: stock.schema("purchasing"),
    //     },
    //     {
    //       model: purchase_order_header.schema("purchasing"),
    //       // where: { pohe_number },
    //     },
    //   ],
    // });

    const data = await purchase_order_header.schema("purchasing").findAll({
      include: [
        {
          model: purchase_order_detail.schema("purchasing"),
        },
        {
          model: vendor.schema("purchasing"),
          include: {
            model: vendor_product.schema("purchasing"),
            include: {
              model: stock.schema("purchasing"),
            },
          },
        },
      ],
      where: {
        pohe_number: pohe_number,
      },
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

const deleteDataOrderDetail = async (req, res) => {
  try {
    const ponum = req.query.ponum;
    const idPode = +req.query.idPode;

    await purchase_order_header.schema("purchasing").destroy({
      where: { pohe_number: ponum },
    });

    await purchase_order_detail.schema("purchasing").destroy({
      where: { pode_id: idPode },
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

const updateOrederDetail = async (req, res) => {
  try {
    const id = +req.query.id;

    const { pode_line_total, pode_order_qty, pode_received_qty, pode_rejected_qty } = req.body;

    let total = pode_order_qty * pode_line_total;
    total = total - pode_line_total;

    const data = await purchase_order_detail.schema("purchasing").update(
      {
        pode_order_qty,
        pode_received_qty,
        pode_rejected_qty,
        pode_line_total: total,
      },
      {
        where: { pode_id: id },
      }
    );

    console.log({ pode_order_qty, pode_received_qty, pode_rejected_qty });

    res.status(200).json({
      message: "Success.",
      data,
    });
  } catch (error) {
    res.status(400).json({
      message: "Updated failed!.",
      error: error.message,
    });
  }
};

const genereateBarcode = async (req, res) => {
  try {
    const { stod_stock_id, stod_pohe_id, stod_status } = req.body;

    const randomString = Math.floor(Math.random() * 9000000000) + 1000000000;
    const stod_barcode_number = `PB${randomString}`;

    //Hapus AF Facility
    // const stod_faci = Math.floor(Math.random() * 10 * 3);

    //insert DB
    const data = await stock_detail.schema("purchasing").create({
      stod_barcode_number,
      stod_stock_id,
      stod_faci_id: 1,
      stod_pohe_id,
      stod_status,
    });

    res.status(200).json({
      message: "Success.",
      data,
    });
  } catch (error) {
    res.status(400).json({
      message: "Updated failed!.",
      error: error.message,
    });
  }
};

module.exports = { genereateBarcode, updateOrederDetail, deleteDataOrderDetail, getDataOrderHeader, addDataOrderHeader, deleteDataOrderHeader, switchOrder, getDataOrderDetail };
