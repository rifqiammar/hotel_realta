import React, { useEffect, useState } from "react";
import { searchVendorProduct } from "../../../actions/purchasing/vendorActions";
import Swal from "sweetalert2";
import axios from "axios";
import { useParams } from "react-router-dom";

const ModalVendorProduct = () => {
  const { vendorId } = useParams();

  const [keyword, setKeyword] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [qty, setQty] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    searchVendorProduct(keyword).then((e) => {
      setSearchResult(e.data.data[0]);
    });
  }, [keyword]);

  const addVendorHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3005/purchasing/vendorproduct", {
        vepro_qty_stocked: qty,
        vepro_qty_remaining: remaining,
        vepro_price: price,
        vepro_stock_id: searchResult.stock_id,
        vepro_vendor_id: vendorId,
      });

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Vendor has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Vendor Failed to save!",
      });
    }
  };

  return (
    <div className="modal fade" id="vendorProduct" tabindex="-1" aria-labelledby="vendorProduct" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="vendorProduct">
              Add/Edit Vendor
            </h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={addVendorHandler}>
              <div className="row">
                <div className="mb-3 col-md-5">
                  <label for="Stock Name" className="form-label">
                    Stock Name
                  </label>
                  <input type="text" onChange={(e) => setKeyword(e.target.value)} className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" required />
                  {searchResult === undefined ? <p className="text-danger mt-1">Stock tidak di temukan...</p> : ""}
                </div>

                <div className="mb-3 col-md-3 ">
                  <label for="qty Stock" className="form-label">
                    Qty Stock
                  </label>
                  <input
                    type="number"
                    placeholder={qty}
                    onChange={(e) => setQty(e.target.value)}
                    step="1"
                    min="0"
                    // You can add additional attributes like currency formatting here
                  />
                </div>

                <div className="mb-3 col-md-5">
                  <label for="remaining" className="form-label">
                    Remaining
                  </label>
                  <input type="number" className="form-control" id="remaining" placeholder={remaining} onChange={(e) => setRemaining(e.target.value)} required />
                </div>

                <div className="mb-3 col-md-5">
                  <label for="price" className="form-label">
                    Price:
                  </label>
                  <div class="input-group-prepend">
                    <span class="input-group-text">Rp</span>
                    <input type="number" className="form-control" id="price" onChange={(e) => setPrice(e.target.value)} required />
                    <span class="input-group-text">.00</span>
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Close
                  </button>
                  <button type="submit" className="btn btn-dark" data-bs-dismiss="modal">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalVendorProduct;
