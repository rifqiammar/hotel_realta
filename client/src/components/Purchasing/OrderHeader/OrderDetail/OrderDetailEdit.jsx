import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const OrderDetailEdit = () => {
  const { getDataOrderDetailResult } = useSelector((state) => state.orderDataReducers);

  const [stock, setStock] = useState("");
  const [orderQty, setOrderQty] = useState(0);
  const [receive, setReceive] = useState(0);
  const [rejected, setRejected] = useState(0);
  const [unGenerate, setUnGenerate] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  const editOrderDetailHandler = async (e) => {
    e.preventDefault();

    try {
      // console.log({ orderQty, rejected, receive });
      await axios.put(`http://localhost:3005/purchasing/orderheaderdetail?id=${id}`, {
        pode_order_qty: orderQty,
        pode_received_qty: receive,
        pode_rejected_qty: rejected,
        pode_line_total: getDataOrderDetailResult.pohe_subtotal,
      });

      navigate("/purchasing/listorder");

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Vendor has been saved",
        showConfirmButton: false,
        timer: 500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
      console.log(error.message);
    }
  };

  const generateBarcodeHandler = async () => {
    const dataOrderTemp = {
      stod_stock_id: getDataOrderDetailResult.vendor.vendor_products[0].stock.stock_id,
      stod_pohe_id: getDataOrderDetailResult.pohe_id,
      stod_status: getDataOrderDetailResult.pohe_status,
    };

    const { stod_stock_id, stod_pohe_id, stod_status } = dataOrderTemp;

    // Insert Stock Detail Dengan Id Stock getDataOrderDetailResult
    try {
      await axios.post(`http://localhost:3005/purchasing/orderbarcode`, {
        stod_stock_id,
        stod_pohe_id,
        stod_status,
      });

      setUnGenerate(false);
      let timerInterval;
      Swal.fire({
        title: "Wait a Sec!",
        html: "BARCODE Generated <b></b> milliseconds.",
        timer: 500,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const timer = Swal.getPopup().querySelector("b");
          timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`;
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("Barcode Has been Generated!");
        }
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Barcode Telah Di Generate!",
          showConfirmButton: false,
          timer: 500,
        });
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container">
      <div className="card shadow mb-4 ">
        <div className="card-body">
          {/* Modal Body */}
          <form onSubmit={editOrderDetailHandler}>
            <div className="row">
              <div className="mb-3 col-md-5">
                <label for="stockName" className="form-label">
                  stock
                </label>
                <input type="text" onChange={(e) => setStock(e.target.value)} className="form-control" id="stockName" required />
              </div>

              <div class="col-md-3 mb-3">
                <label for="reOrder">Order Qty</label>
                <input type="number" onChange={(e) => setOrderQty(e.target.value)} class="form-control" id="orderqty" placeholder="0" required />
              </div>

              <div class="col-md-3 mb-3">
                <label for="reOrder">Receive</label>
                <input type="number" onChange={(e) => setReceive(e.target.value)} class="form-control" id="received" placeholder="0" required />
              </div>

              <div class="col-md-3 mb-3">
                <label for="reOrder">Rejected</label>
                <input type="number" onChange={(e) => setRejected(e.target.value)} class="form-control" placeholder="0" required />
              </div>

              <div className="modal-footer">
                <button type="submit" className="btn btn-dark mr-5">
                  Save
                </button>
              </div>
            </div>
          </form>
          <div className="container d-flex justify-content-center">
            {receive > 0 && unGenerate ? (
              <button class="btn btn-primary btn-lg active" onClick={generateBarcodeHandler} role="button" aria-pressed="true">
                Generate Barcode
              </button>
            ) : (
              <button type="button" class="btn btn-secondary btn-lg" disabled>
                Generate Barcode
              </button>
            )}
          </div>
          {/* End Content */}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailEdit;
