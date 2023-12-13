import React, { useEffect, useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getListVendor, deleteVendor } from "../../../actions/purchasing/vendorActions";

import Swal from "sweetalert2";

import AddModal from "./AddModal";
import Result from "./Result/Result";
import Loading from "./Result/Loading";

import Pagination from "../Pagination";
import SearchBar from "../SearchBar";

const VendorContent = () => {
  const { getListVendorResult, getListVendorLoading, getListVendorError } = useSelector((state) => state.vendorReducers);

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(3);
  const [priority, setPriority] = useState("DESC");
  const [keyword, setKeyword] = useState("");
  const [deleteStat, setDeleteStat] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log({ useEffect: keyword });
    dispatch(getListVendor(page, limit, priority, keyword));
  }, [dispatch, page, limit, priority, keyword, deleteStat]);

  const changePage = ({ selected }) => {
    setPage(+selected);
    console.log(+selected);
  };

  const deleteDataVendor = (id) => {
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
        deleteVendor(id);
      }
    });
  };

  return (
    <div className="container-fluid">
      {/* <!-- Page Heading --> */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h5 className="h5 font-weight-bold mb-0 text-gray-800 ms-3">DataTable Vendor</h5>
      </div>

      {/* Content */}
      <div className="card shadow mb-4 ">
        <div className="card-body">
          <div className="table-responsive ">
            {/* Search Bar */}
            <div className="container mb-4 d-flex justify-content-center">
              <SearchBar setKeyword={setKeyword} keyword={keyword} />

              <select className="form-select w-25" id="inputGroupSelect01" required onChange={(e) => setPriority(e.target.value)}>
                <option value="DESC">Highest</option>
                <option value="ASC">Lowest</option>
              </select>
            </div>
            {/* endSearchBar */}

            {/* Content  */}
            <table className="table" id="dataTable" width="100%" cellspacing="0">
              <thead className="thead-dark">
                <tr>
                  <th className="">#</th>
                  <th className="">Vendor</th>
                  <th className="">Status</th>
                  <th className="">Priority</th>
                  <th className="">Register date</th>
                  <th className="">Web Url</th>
                  <th scope="col">
                    <button className="btn btn-secondary" type="button" data-bs-toggle="modal" data-bs-target="#addModal">
                      <IoAddCircle />
                      <span className="ms-2">Add</span>
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {getListVendorResult ? (
                  getListVendorResult.data.map((vendor, i) => {
                    return <Result i={i + getListVendorResult.offset + 1} vendor={vendor} deleteDataVendor={deleteDataVendor} />;
                  })
                ) : getListVendorLoading ? (
                  <Loading />
                ) : (
                  <p>{getListVendorError ? getListVendorError : "Data Kosong"}</p>
                )}
              </tbody>
            </table>
            {/* EndContent */}
            <Pagination data={getListVendorResult} changePage={changePage} />
          </div>
          {/* Modals */}
          <AddModal />
        </div>
      </div>
    </div>
  );
};

export default VendorContent;
