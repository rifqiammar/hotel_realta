import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListOrder, deleteOrder, dataOrder } from "../../../../actions/purchasing/orderAction";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import Pagination from "../../Pagination";
import SearchBar from "../../SearchBar";
import OrderResult from "./OrderResult";
import SwitchModal from "./SwitchModal";

const OrderHeader = () => {
  const { getListOrderResult, getListOrderLoading, getListOrderError } = useSelector((state) => state.orderReducers);

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(3);
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");
  const [deleteStat, setDeleteStat] = useState(false);

  const [orderId, setOrderId] = useState(0);
  const [orderData, setOrderData] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListOrder(page, limit, keyword, status));
  }, [dispatch, page, limit, keyword, status, deleteStat]);

  const changePage = ({ selected }) => {
    setPage(+selected);
    console.log(+selected);
  };

  const getOrderPoNum = (poNum, order) => {
    setOrderData(order);
    console.log({ order });
    setOrderId(poNum);
  };

  const detailOrderHandler = (order) => {
    dispatch(dataOrder(order));
    console.log({ order });
    navigate(`/purchasing/listorder/${order.pohe_number}`);
  };

  const deleteDataOrder = (idOrder) => {
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

        console.log(idOrder);
        deleteOrder(idOrder);
        setDeleteStat(true);
      }
    });
  };

  return (
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
            <div className="container mb-4 d-flex justify-content-center">
              <SearchBar setKeyword={setKeyword} keyword={keyword} />

              <select className="form-select w-25" id="inputGroupSelect01" required onChange={(e) => setStatus(e.target.value)}>
                <option value="">Status</option>
                <option value="1">Pending</option>
                <option value="2">Approve</option>
                <option value="3">Rejected</option>
                <option value="4">Received</option>
                <option value="5">Completed</option>
              </select>
            </div>
            {/* endSearchBar */}

            {/* Content  */}
            <table className="table" id="dataTable" width="100%" cellspacing="0">
              <thead className="thead-dark">
                <tr>
                  <th className="">PO Number</th>
                  <th className="">Po Date</th>
                  <th className="">Vendor Target</th>
                  {/* <th className="">Line Items</th> */}
                  <th className="">Total Amount</th>
                  <th className="">Status</th>
                  <th className=""></th>
                </tr>
              </thead>
              <tbody>
                {getListOrderResult ? (
                  getListOrderResult.data.map((order) => {
                    return <OrderResult order={order} deleteDataOrder={deleteDataOrder} getOrderPoNum={getOrderPoNum} detailOrderHandler={detailOrderHandler} />;
                  })
                ) : getListOrderLoading ? (
                  <p>Loading...</p>
                ) : (
                  <p>{getListOrderError ? getListOrderError : "Data Kosong"}</p>
                )}
              </tbody>
            </table>
            {/* EndContent */}
            <Pagination data={getListOrderResult} changePage={changePage} />
          </div>
          {/* Modals */}

          <SwitchModal orderId={orderId} />

          {/*  */}
        </div>
      </div>
    </div>
  );
};

export default OrderHeader;
