import React from "react";
import { CgMenuRight } from "react-icons/cg";

// import EditVendor from "../EditVendor";

const StockDetail = ({ stockDetail, deleteDataStockDetail, setStockId }) => {
  return (
    <>
      {console.log(stockDetail)}
      <tr key={stockDetail.stod_id}>
        <td>{stockDetail.stod_barcode_number ? stockDetail.stod_barcode_number : <p></p>}</td>
        <td>{stockDetail.stod_status == 1 ? "Stocked" : stockDetail.stod_status == 2 ? "Expired" : stockDetail.stod_status == 3 ? "Broken" : "Used"}</td>
        <td>{stockDetail.notes ? stockDetail.notes : <p> </p>}</td>
        <td>{stockDetail.purchase_order_header.pohe_number}</td>
        {/* <td>{stockDetail.purchase_order_header.pohe_number}</td> */}
        <td>Room 002</td>
        <td>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <CgMenuRight />
            </button>
            <ul class="dropdown-menu">
              {/* <li>
                <button className="btn btn-light" onClick={() => getStockId(stock.stock_id, stock)} type="button" data-bs-toggle="modal" data-bs-target="#editModal">
                  <span className="ms-1">Edit</span>
                </button>
              </li> */}
              <li>
                <button
                  className="btn btn-light"
                  onClick={() => {
                    setStockId(stockDetail.stod_id);
                  }}
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#editStockDModal"
                  class="dropdown-item"
                >
                  <h6 className="font-weight-normal">Edit</h6>
                </button>
              </li>
              <li>
                <button className="btn btn-light" onClick={() => deleteDataStockDetail(stockDetail.stod_id)} class="dropdown-item">
                  <h6 className="font-weight-normal">Delete</h6>
                </button>
              </li>
            </ul>
          </div>
        </td>
      </tr>
    </>
  );
};

export default StockDetail;
