import React, { useEffect, useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getListStock, deleteStock, dataStock } from "../../../../actions/purchasing/stockAction";
// getDataStockResult

import Swal from "sweetalert2";

import StockResult from "./StockResult";
import Pagination from "../../Pagination";
import SearchBar from "../../SearchBar";
import AddModal from "../AddModal";
import EditModal from "../EditModal";
import UploadModal from "../UploadModal";
import { useNavigate } from "react-router-dom";

const Stock = () => {
  const { getListStockResult, getListStockLoading, getListStockError } = useSelector((state) => state.stockReducers);

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(3);
  const [keyword, setKeyword] = useState("");
  const [urutan, setUrutan] = useState("DESC");
  const [deleteStat, setDeleteStat] = useState(false);

  const [stockId, setStockId] = useState(0);
  const [stockData, setStockData] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListStock(page, limit, keyword, urutan));
  }, [dispatch, page, limit, keyword, urutan, deleteStat]);

  const changePage = ({ selected }) => {
    setPage(+selected);
    console.log(+selected);
  };

  const getStockId = (id, stock) => {
    setStockData(stock);
    setStockId(id);
  };

  const addStockDetailHandler = (stock, id) => {
    dispatch(dataStock(stock));
    navigate(`/purchasing/stock/${id}`);
  };

  const deleteDataStock = (id) => {
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
        deleteStock(id);
      }
    });
  };

  return (
    <div className="container-fluid">
      {/* <!-- Page Heading --> */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h5 className="h5 font-weight-bold mb-0 text-gray-800 ms-3">DataTable Stock</h5>
      </div>

      {/* Content */}
      <div className="card shadow mb-4 ">
        <div className="card-body">
          <div className="table-responsive ">
            {/* Search Bar */}
            <div className="container mb-4 d-flex justify-content-center">
              <SearchBar setKeyword={setKeyword} keyword={keyword} />

              <select className="form-select w-25" id="inputGroupSelect01" required onChange={(e) => setUrutan(e.target.value)}>
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
                  <th className="">Stock</th>
                  <th className="">Re-Order Point</th>
                  <th className="">Qty</th>
                  <th className="">Used</th>
                  <th className="">Scrap</th>
                  <th className="">Size</th>
                  <th>Color</th>
                  <th scope="col">
                    <button className="btn btn-secondary" type="button" data-bs-toggle="modal" data-bs-target="#addModal">
                      <IoAddCircle />
                      <span className="ms-2">Add</span>
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {getListStockResult ? (
                  getListStockResult.data.map((stock, i) => {
                    return <StockResult i={i + getListStockResult.offset + 1} stock={stock} getStockId={getStockId} addStockDetailHandler={addStockDetailHandler} deleteDataStock={deleteDataStock} />;
                  })
                ) : getListStockLoading ? (
                  <p>Loading...</p>
                ) : (
                  <p>{getListStockError ? getListStockError : "Data Kosong"}</p>
                )}
              </tbody>
            </table>
            {/* EndContent */}
            <Pagination data={getListStockResult} changePage={changePage} />
          </div>
          {/* Modals */}
          <EditModal stockId={stockId} stockData={stockData} />
          <UploadModal stockId={stockId} />
          <AddModal />
        </div>
      </div>
    </div>
  );
};

export default Stock;
