import React, { useEffect, useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getDetailStock, deleteStockDetail } from "../../../../actions/purchasing/stockAction";
import { useParams } from "react-router-dom";

import Swal from "sweetalert2";

import Pagination from "../../Pagination";
import SearchBar from "../../SearchBar";
import Result from "./Result";
import EditStockModal from "./EditStockModal";
// import AddModal from "../AddModal";

const StockDetail = () => {
  const { getListDetailStockResult, getListDetailStockLoading, getListDetailStockError } = useSelector((state) => state.stockReducers);
  const { dataStockResult } = useSelector((state) => state.stockReducers);

  const { id } = useParams();

  const [deleteStat, setDeleteStat] = useState(false);
  const [status, setStatus] = useState(false);
  const [stockID, setStockId] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetailStock(id));
  }, [dispatch, deleteStat, status]);

  const deleteDataStockDetail = (id) => {
    if (deleteStat) {
      setDeleteStat(false);
    }

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
        setDeleteStat(true);
        deleteStockDetail(id);
      }
    });
  };

  return (
    <div className="container-fluid">
      {/* <!-- Page Heading --> */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h5 className="h5 font-weight-bold mb-0 text-gray-800 ms-3">{dataStockResult}</h5>
      </div>

      {/* Content */}
      <div className="card shadow mb-4 ">
        <div className="card-body">
          <div className="table-responsive ">
            {/* Content  */}
            <table className="table" id="dataTable" width="100%" cellspacing="0">
              <thead className="thead-dark">
                <tr>
                  <th className="">Barcode</th>
                  <th className="">Status</th>
                  <th className="">Notes</th>
                  <th className="">Po Number</th>
                  <th className="">Used In</th>
                  <th className="">Action</th>
                </tr>
              </thead>
              <tbody>
                {getListDetailStockResult ? (
                  getListDetailStockResult.data.map((stockDetail) => {
                    return <Result setStockId={setStockId} stockDetail={stockDetail} deleteDataStockDetail={deleteDataStockDetail} />;
                  })
                ) : getListDetailStockLoading ? (
                  <p>Loading...</p>
                ) : (
                  <p>{getListDetailStockError ? getListDetailStockError : "Data Kosong"}</p>
                )}
              </tbody>
              {console.log({ getListDetailStockResult })}
            </table>
            {/* EndContent */}
          </div>
          {/* Modals */}
          <EditStockModal id={id} setStatus={setStatus} stockID={stockID} />
        </div>
      </div>
    </div>
  );
};

export default StockDetail;
