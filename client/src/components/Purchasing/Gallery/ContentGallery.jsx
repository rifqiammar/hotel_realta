import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListGallery } from "../../../actions/purchasing/galleryAction";
import currency from "../../../helper/currency";

import SearchBar from "../SearchBar";
import Pagination from "../Pagination";

const ContentGallery = ({ setChartHandle }) => {
  const { getListGalleryResult, getListGalleryLoading, getListGalleryError } = useSelector((state) => state.galleryReducers);

  const [keyword, setKeyword] = useState("");
  const [urutan, setUrutan] = useState("DESC");
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(6);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListGallery(page, keyword, urutan));
  }, [dispatch, keyword, urutan]);

  const changePage = ({ selected }) => {
    setPage(+selected);
    console.log(+selected);
  };

  return (
    <>
      <div className="gallerySearch mb-5">
        <div className="container mb-4 d-flex justify-content-center">
          <SearchBar setKeyword={setKeyword} keyword={keyword} />

          <select className="form-select w-25" id="inputGroupSelect01" required onChange={(e) => setUrutan(e.target.value)}>
            <option value="DESC">Price High To Low</option>
            <option value="ASC">Price Low To High</option>
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mt-3">
        <div className="row">
          {getListGalleryResult ? (
            getListGalleryResult.data.map((e) => {
              return (
                <div className="col-md-3 my-3 ">
                  <div className="card" style={{ width: "18rem" }}>
                    <img src={e.stock.stock_photos.length === 0 ? require("../../../photos/no_image.jpg") : e.stock.stock_photos.filter((e) => e.spho_primary === true)[0].spho_url} className="card-img-top" alt="..." />
                    {/* {console.log()} */}
                    <div className="card-body ">
                      <h5 className="card-title">{e.stock.stock_name}</h5>
                      <p className="text-muted mt-3 ">{e.stock.stock_description}</p>
                      <div className="row">
                        <p className="card-text col">
                          <small className="text-muted ">Stocked: {e.vepro_qty_stocked}</small>
                        </p>
                        <p className="card-text col">
                          <small className="text-muted ">Re-Order: {e.stock.stock_reorder_point}</small>
                        </p>
                      </div>
                      <h6 className="h6">{currency(e.vepro_price)}</h6>

                      <button class="btn btn-primary mt-3 float-end" onClick={() => setChartHandle(e)} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                        Add To Chart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : getListGalleryLoading ? (
            <p>Loading...</p>
          ) : (
            <p>{getListGalleryError ? getListGalleryError : "Data Kosong"}</p>
          )}
          {/*  */}
        </div>
      </div>

      <Pagination data={getListGalleryResult} changePage={changePage} />
    </>
  );
};

export default ContentGallery;
