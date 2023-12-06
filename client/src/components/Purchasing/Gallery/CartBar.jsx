import React from "react";
import axios from "axios";
import { FaShoppingCart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import currency from "../../../helper/currency";
import calculateTax from "../../../helper/calculateTax";
import { useNavigate } from "react-router-dom";

const CartBar = ({ dataCart, cartHandle }) => {
  const navigate = useNavigate();

  const requestOrderHandler = async () => {
    console.log("dari Handler", dataCart);
    // Mengumpulkan Nama vendor ke dalam array
    let dataVendorName = dataCart.map((e, i) => {
      return e.data.vendor.vendor_name;
    });

    // Mencari nilai array yang sama
    let filterData = dataVendorName.filter((e, i) => {
      return dataVendorName.indexOf(e) !== i;
    });

    // Total Price Untuk Semua Item yang ada di chart
    let totalPriceAll = dataCart
      .map((e) => {
        return e.data.vepro_price;
      })
      .reduce((acc, curr) => {
        return acc + curr;
      });

    dataVendorName.forEach(async (element, index) => {
      if (dataVendorName.length >= 1 || filterData.length === 1) {
        // // Mengambil / memilah data sesuai vendor
        const getDataCart = dataCart.filter((dataE) => {
          return element === dataE.data.vendor.vendor_name;
        });
        // // Penjumlahan sub total
        let subTotal = getDataCart
          .map((e) => {
            return e.data.vepro_price;
          })
          .reduce((acc, curr) => {
            return acc + curr;
          });

        // Jumlah Stock Barang yang di order
        let qtyStock = getDataCart.length;

        const VendorId = getDataCart.map((e) => {
          return e.data.vepro_vendor_id;
        });

        const StockId = getDataCart.map((e) => {
          return e.data.stock.stock_id;
        })[0];
        const veproPrice = getDataCart.map((e) => {
          return e.data.vepro_price;
        })[0];

        // console.log(vendorNamecart);

        console.log({ StockId: StockId });
        console.log({ veproPrice });
        console.log({ element });

        console.log({ dataVendorName });
        console.log({ filterData });

        let total = calculateTax(subTotal, 0.1);

        try {
          const tax = 10;

          await axios.post("http://localhost:3005/purchasing/orderheader", {
            pohe_subtotal: subTotal,
            pohe_tax: tax,
            pohe_total_amount: total,
            pohe_emp_id: 1,
            pohe_status: 1,
            pohe_vendor_id: VendorId[0],
            pode_stock_id: StockId,
            pode_price: veproPrice,
            pode_order_qty: qtyStock,
            pode_line_total: totalPriceAll,
          });

          navigate("/purchasing/listorder");
        } catch (err) {
          console.log(err);
        }

        console.log({ filterDataMasuk: filterData });
        console.log({ getDataCartatas: getDataCart });
      }
    });
    console.log({ dataCartBawah: dataCart });
    console.log({ dataVendorNameBawah: dataVendorName });
  };

  return (
    <>
      <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div class="offcanvas-header" style={{ borderBottom: "0.5px solid grey" }}>
          <h5 class="offcanvas-title mx-auto" id="offcanvasRightLabel">
            <FaShoppingCart /> <span className="ms-2">Item Ordered</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          {/* Body */}

          {/* Show Data */}
          {dataCart.length !== 0
            ? dataCart.map((e) => {
                return (
                  <div className="container mb-5" key={e.data.vepro_id}>
                    <h5 style={{ fontSize: "1.4rem" }}>{e.data.stock.stock_name}</h5>
                    <p style={{ fontSize: "0.9rem ", marginLeft: "1.3rem" }}>{e.data.vendor.vendor_name}</p>
                    <div className="row">
                      <p className="col" style={{ fontSize: "1rem ", fontWeight: "bold", marginLeft: "1.3rem" }}>
                        {currency(e.data.vepro_price)}
                        <span className="mx-2" style={{ fontSize: "0.8rem" }}>
                          X
                        </span>
                        1
                        <span className="mx-2" style={{ fontSize: "0.8rem" }}>
                          =
                        </span>
                        <span className="mr-3">{currency(e.data.vepro_price)}</span>
                        <button
                          style={{ border: "0.8px solid red" }}
                          onClick={() => {
                            cartHandle(e.data.stock.stock_name);
                          }}
                        >
                          <MdDelete />
                        </button>
                      </p>
                    </div>
                  </div>
                );
              })
            : ""}

          <hr className="my-3" />
          {/* Count */}
          <div className="container mt-5">
            <h6>
              Subtotal :
              <span className="ms-4">
                {dataCart.length !== 0
                  ? currency(
                      dataCart
                        .map((e) => e.data.vepro_price)
                        .reduce((acc, curr) => {
                          return acc + curr;
                        })
                    )
                  : ""}
              </span>
            </h6>

            <h6 className="my-4">
              <span className="mr-5 " style={{ marginTop: "1rem" }}>
                Tax :
              </span>
              <span className="ms-5">10%</span>
            </h6>
            <h6>
              Total :
              <span className="ms-5">
                {dataCart.length !== 0
                  ? currency(
                      calculateTax(
                        dataCart
                          .map((e) => e.data.vepro_price)
                          .reduce((acc, curr) => {
                            return acc + curr;
                          }),
                        0.1
                      )
                    )
                  : ""}
              </span>
            </h6>
          </div>

          <div className="container d-flex justify-content-center mt-5">
            <button type="button" class="btn btn-primary" onClick={() => requestOrderHandler()}>
              Request Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartBar;
