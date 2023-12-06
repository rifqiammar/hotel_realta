import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVendorProduct } from "../../../actions/purchasing/vendorActions";
import { IoAddCircle } from "react-icons/io5";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

import Pagination from "../Pagination";
import ModalVendorProduct from "./ModalVendorProduct";
import VendorProductContent from "./VendorProduct/VendorProductContent";

const AddProductVendor = () => {
  const { getVendorProductResult, getVendorProductLoading, getVendorProductError } = useSelector((state) => state.vendorReducers);

  const { vendorId } = useParams();

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);

  const [deleteStat, setDeleteStat] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVendorProduct(vendorId, page, limit));
  }, [dispatch, page, limit, deleteStat]);

  const changePage = ({ selected }) => {
    setPage(+selected);
    console.log(+selected);
  };

  return (
    <div className="container-fluid">
      {/* <!-- Page Heading --> */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h5 className="h5 font-weight-bold mb-0 text-gray-800 ms-3">DataTable Vendor Product</h5>
      </div>

      {/* Content */}
      <div className="card shadow mb-4 ">
        <div className="card-body">
          <div className="table-responsive ">
            {/* Content  */}
            <table className="table" id="dataTable" width="100%" cellspacing="0">
              <thead className="thead-dark">
                <tr>
                  <th className="">#</th>
                  <th className="">Stock</th>
                  <th className="">Qty Stocked</th>
                  <th className="">Qty Remaining</th>
                  <th className="">Price</th>
                  <th scope="col">
                    <button className="btn btn-secondary" type="button" data-bs-toggle="modal" data-bs-target="#vendorProduct">
                      <IoAddCircle />
                      <span className="ms-2">Add</span>
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Content */}

                {getVendorProductResult ? (
                  getVendorProductResult.data.map((Vproduct, i) => {
                    return <VendorProductContent i={i + getVendorProductResult.offset + 1} Vproduct={Vproduct} />;
                  })
                ) : getVendorProductLoading ? (
                  // <Loading />
                  <p>Loading...</p>
                ) : (
                  <p>{getVendorProductError ? getVendorProductError : "Data Kosong"}</p>
                )}
                {/* EndContent */}
              </tbody>
            </table>
            <Pagination data={getVendorProductResult} changePage={changePage} />
          </div>
          {/* Modals */}
          <ModalVendorProduct />
        </div>
      </div>
    </div>
  );
};

export default AddProductVendor;
