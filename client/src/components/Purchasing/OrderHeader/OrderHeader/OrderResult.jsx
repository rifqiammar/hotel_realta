import React from "react";
import { CgMenuRight } from "react-icons/cg";
import currency from "../../../../helper/currency";
import dateTimezone from "../../../../helper/dateTimezone";

import SwitchModal from "./SwitchModal";
// import EditVendor from "../EditVendor";

const OrderResult = ({ order, deleteDataOrder, getOrderPoNum, detailOrderHandler }) => {
  return (
    <>
      <tr key={order.pohe_id}>
        <th className="text-gray-800 ms-3" scope="row">
          {order.pohe_number}
        </th>
        <td>{dateTimezone(order.pohe_order_date)}</td>
        <td>{order.vendor.vendor_name}</td>
        <td>{currency(order.pohe_total_amount)}</td>
        <td>{order.pohe_status == 1 ? "Pending" : order.pohe_status == 2 ? "Approved" : order.pohe_status == 3 ? "Rejected" : order.pohe_status == 4 ? "Received" : "Completed"}</td>
        <td>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <CgMenuRight />
            </button>
            <ul class="dropdown-menu">
              <li>
                <button className="btn btn-light" onClick={() => getOrderPoNum(order.pohe_number)} type="button" data-bs-toggle="modal" data-bs-target="#switchModal">
                  <span className="ms-1">Switch Status</span>
                </button>
              </li>

              <li>
                <button className="btn btn-light" onClick={() => deleteDataOrder(order.pohe_number)} class="dropdown-item">
                  <h6 className="font-weight-normal">Delete</h6>
                </button>
              </li>
              <li>
                <button
                  class="dropdown-item"
                  onClick={() => {
                    detailOrderHandler(order);
                  }}
                >
                  <h6 className="font-weight-normal">Details</h6>
                </button>
              </li>
            </ul>
          </div>
        </td>
      </tr>
    </>
  );
};

export default OrderResult;
