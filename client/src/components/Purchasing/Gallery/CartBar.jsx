import React, { useEffect } from "react";
import { addOrders } from "../../../actions/purchasing/galleryAction";
import axios from "axios";
import { FaShoppingCart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import currency from "../../../helper/currency";
import calculateTax from "../../../helper/calculateTax";
import { useNavigate } from "react-router-dom";

const CartBar = ({ dataCart, cartHandle, qtyValue, qtStat }) => {
  const navigate = useNavigate();

  useEffect(() => {}, [qtyValue, qtStat]);

  const total = (price, qty) => {
    const total = price * qty;
    console.log({ price, qty }, total);
    return currency(total);
  };

  const requestOrderHandler = async () => {
    console.log("dari Handler", dataCart);

    // // Mencari data dengan vendor yang sama
    // const vendorDataName = dataCart.map((e) => {
    //   return e.data.vendor.vendor_name;
    // });

    let tempCart = {};

    dataCart.forEach((element) => {
      if (tempCart[element.data.vendor.vendor_name]) {
        tempCart[element.data.vendor.vendor_name].pode_line_total = tempCart[element.data.vendor.vendor_name].pohe_subtotal + element.data.vepro_price * element.QtyProd;
        tempCart[element.data.vendor.vendor_name].pode_stock_id.push({ pode_stock_id: element.data.stock.stock_id });
        tempCart[element.data.vendor.vendor_name].pohe_total_amount += calculateTax(element.data.vepro_price * element.QtyProd, 0.1);
      } else {
        tempCart[element.data.vendor.vendor_name] = {
          pohe_vendor_id: element.data.vendor.vendor_entity_id,
          pohe_subtotal: element.data.vepro_price * element.QtyProd,
          pohe_emp_id: 1,
          pohe_status: 1,
          pohe_tax: 10,
          pode_order_qty: element.QtyProd,
          pode_price: element.data.vepro_price,
          pohe_total_amount: calculateTax(element.data.vepro_price * element.QtyProd, 0.1),
          pode_stock_id: [
            {
              pode_stock_id: element.data.stock.stock_id,
            },
          ],
        };
      }
    });

    // Mengirim Ke Api, Looping Isi dari tempData
    for (const key in tempCart) {
      // console.log(`${key}`, tempCart[key]);
      if (tempCart[key].pode_stock_id.length > 1) {
        tempCart[key].pode_stock_id.forEach((e) => {
          addOrders(tempCart[key], e.pode_stock_id);
        });
      } else {
        addOrders(tempCart[key], tempCart[key].pode_stock_id[0].pode_stock_id);
      }
    }

    // Jika Data Berhasil Dikirim Maka, Tendang ke Halaman ListOrder
    navigate("/purchasing/listorder");
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
            ? dataCart.map((e, index) => {
                return (
                  <div className="container mb-5" key={e.data.vepro_id}>
                    <h5 style={{ fontSize: "1.4rem" }}>{e.data.stock.stock_name}</h5>
                    <p style={{ fontSize: "0.9rem ", marginLeft: "1.3rem" }}>{e.data.vendor.vendor_name}</p>
                    <div className="row">
                      <p className="col" style={{ fontSize: "1rem ", fontWeight: "bold", marginLeft: "1.3rem" }}>
                        {currency(e.data.vepro_price)}
                        <span className="mx-2 " style={{ fontSize: "0.8rem" }}>
                          X{" "}
                          <span className="fs-6" style={{ fontSize: "0.9rem" }}>
                            {e.QtyProd}
                          </span>
                        </span>
                        <span className="mx-2" style={{ fontSize: "0.8rem" }}>
                          =
                        </span>
                        <span className="mr-3">{total(e.data.vepro_price, e.QtyProd)}</span>
                        {/* <button
                          style={{ border: "0.8px solid red" }}
                          onClick={() => {
                            cartHandle(e.data.stock.stock_name);
                          }}
                        >
                          <MdDelete />
                        </button> */}
                        <button
                          style={{ border: "0.8px solid red" }}
                          onClick={() => {
                            cartHandle(index);
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
                        .map((e) => e.data.vepro_price * e.QtyProd)
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
                          .map((e) => e.data.vepro_price * e.QtyProd)
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
