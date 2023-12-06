import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import currency from "../../../../helper/currency";
import { getListDetail, deleteOrderDetail, addDataOrderDetail } from "../../../../actions/purchasing/orderAction";
import { useNavigate, useParams } from "react-router-dom";

import OrderEditModal from "./OrderEditModal";

import Swal from "sweetalert2";

import dateTimezone from "../../../../helper/dateTimezone";

const Main = () => {
  const { getDataOrderResult, getDataOrderLoading } = useSelector((state) => state.orderDataReducers);
  const { getListOrderDetailResult, getListOrderDetailLoading, getListOrderDetailError } = useSelector((state) => state.orderDataReducers);

  const [deleteStat, setDeleteStat] = useState(false);

  const { ponumber } = useParams();

  const [orderId, setorderId] = useState(0);
  const [orderData, setOrderData] = useState([]);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const setDataIDOrder = (id, data) => {
    setOrderData(data);
    setorderId(id);
  };

  useEffect(() => {
    dispatch(getListDetail(ponumber));
  }, [dispatch, deleteStat]);

  const dataEditMove = (dataOrderDetail, podeid) => {
    console.log({ dataOrderDetail });
    dispatch(addDataOrderDetail(dataOrderDetail));
    navigate(`/purchasing/listorder/edit/${podeid}`);
  };

  const deleteDataOrder = (ponumber, id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });

        deleteOrderDetail(ponumber, id);
        setDeleteStat(true);
        navigate("/purchasing/listorder");
      }
    });
  };

  return (
    <>
      <div className="container-fluid">
        {/* <!-- Page Heading --> */}
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h5 className="h5 font-weight-bold mb-0 text-gray-800 ms-3">Order Header</h5>
        </div>

        {/* Content */}
        <div className="card shadow mb-4 ">
          <div className="card-body">
            <div className="table-responsive ">
              {/* Search Bar */}
              {/* {console.log({ OrderDataLenght: (getDataOrderResult.lenght === 0) === false, getDataOrderResult })}
              {console.log({ OrderDataObject: typeof getDataOrderResult === "object" })} */}
              {/* {console.log([getDataOrderResult].length)} */}

              {getDataOrderResult ? (
                <div className="container mb-4 d-flex justify-content-center">
                  <div>
                    <div className=" container">
                      <h6 className="d-inline">
                        PO Number:{" "}
                        <span className="ms-2" style={{ fontWeight: "normal" }}>
                          {getDataOrderResult.pohe_number}{" "}
                        </span>
                      </h6>
                      <h6 className="d-inline" style={{ marginLeft: "5rem", marginRight: "5rem" }}>
                        Vendor:{" "}
                        <span className="ms-2" style={{ fontWeight: "normal" }}>
                          {getDataOrderResult.vendor.vendor_name}
                        </span>
                      </h6>
                      <h6 className="d-inline">
                        Subtotal:
                        <span className="ms-2" style={{ fontWeight: "normal" }}>
                          {currency(getDataOrderResult.pohe_subtotal)}
                        </span>
                      </h6>
                    </div>
                    <div className="mt-3 container">
                      <h6 className="d-inline">
                        PO Date:{" "}
                        <span className="ms-2" style={{ fontWeight: "normal" }}>
                          {dateTimezone(getDataOrderResult.pohe_order_date)}
                        </span>
                      </h6>
                      <h6 className="d-inline" style={{ marginLeft: "10rem", marginRight: "5rem" }}>
                        Status:{" "}
                        <span className="ms-2" style={{ fontWeight: "normal" }}>
                          {getDataOrderResult.pohe_status == 1
                            ? "Pending"
                            : getDataOrderResult.pohe_status == 2
                            ? "Approved"
                            : getDataOrderResult.pohe_status == 3
                            ? "Rejected"
                            : getDataOrderResult.pohe_status == 4
                            ? "Received"
                            : "Completed"}
                        </span>
                      </h6>
                      <h6 className="d-inline">
                        Total Amount:
                        <span className="ms-2" style={{ fontWeight: "normal" }}>
                          {currency(getDataOrderResult.pohe_total_amount)}
                        </span>
                      </h6>
                      <p className="d-inline ms-4" style={{ fontSize: "11px" }}>
                        *include tax 10%
                      </p>
                    </div>
                  </div>
                </div>
              ) : getDataOrderLoading ? (
                "Loading"
              ) : (
                <p>Loading</p>
              )}

              {/* Content  */}
              <table className="table" id="dataTable" width="100%" cellspacing="0">
                <thead className="thead-dark">
                  <tr>
                    <th className="">Stock Name</th>
                    <th className="">Qty</th>
                    <th className="">Price</th>
                    <th className="">Received Qty</th>
                    <th className="">Rejected Qty</th>
                    <th className="">Total</th>
                    <th className="">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {getListOrderDetailResult ? (
                    <>
                      <td className="text-black">{getListOrderDetailResult.data[0].vendor.vendor_products[0].stock.stock_name}</td>
                      <td className="text-black">{getListOrderDetailResult.data[0].purchase_order_details[0].pode_order_qty}</td>
                      <td className="text-black">{getListOrderDetailResult.data[0].vendor.vendor_products[0].vepro_price}</td>
                      <td className="text-black">{Math.floor(getListOrderDetailResult.data[0].purchase_order_details[0].pode_received_qty)}</td>
                      <td className="text-black">{Math.floor(getListOrderDetailResult.data[0].purchase_order_details[0].pode_rejected_qty)}</td>
                      <td className="text-black">{getListOrderDetailResult.data[0].pohe_total_amount}</td>
                      {/* <a className="btn btn-light mx-2 mt-1" href={`/purchasing/listorder/edit/${getListOrderDetailResult.data[0].purchase_order_details[0].pode_id}`}>
                        edit
                      </a> */}
                      {/* <button className="btn btn-light" onClick={() => dataEditMove(getListOrderDetailResult.data[0])} type="button" data-bs-toggle="modal" data-bs-target="#editModal">
                        <span className="ms-1">Edit</span>
                      </button> */}

                      <button className="btn btn-light" onClick={() => dataEditMove(getListOrderDetailResult.data[0], getListOrderDetailResult.data[0].purchase_order_details[0].pode_id)} type="button">
                        <span className="ms-1">Edit</span>
                      </button>

                      <button className="btn btn-light" onClick={() => deleteDataOrder(getListOrderDetailResult.data[0].pohe_number, getListOrderDetailResult.data[0].pohe_id)}>
                        Delete
                      </button>
                    </>
                  ) : getListOrderDetailLoading ? (
                    <p>Loading...</p>
                  ) : (
                    <p>{getListOrderDetailError ? getListOrderDetailError : "Data Kosong"}</p>
                  )}
                </tbody>
              </table>
            </div>
            {/* Modals */}
            <OrderEditModal orderData={orderData} />
            {console.log({ orderData })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
