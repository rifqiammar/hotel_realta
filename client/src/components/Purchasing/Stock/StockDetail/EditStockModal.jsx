import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const EditStockModal = ({ stockID, setStatus }) => {
  const [statusDB, setStatusDB] = useState("");
  const editOrderHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3005/purchasing/stockdetail?id=${stockID}`, {
        stod_status: statusDB,
      });

      setStatus(true);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Vendor has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Vendor Failed to save!",
      });
      console.log(error.message);
    }
  };

  return (
    <div className="modal fade" id="editStockDModal" tabindex="-1" aria-labelledby="editStockDModal" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="editStockDModal">
              Edit Stock
            </h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="container">
              {/* Modal Body */}
              <form onSubmit={editOrderHandler}>
                <div className="row">
                  <div className="mb-3 col-md-3">
                    <label for="priority" className="form-label">
                      Status
                    </label>
                    <select className="form-select" id="priority" onChange={(e) => setStatusDB(e.target.value)} required>
                      <option>Status</option>
                      <option value="1">Stocked</option>
                      <option value="2">Expired</option>
                      <option value="3">Broken</option>
                      <option value="4">Used</option>
                    </select>
                  </div>

                  <div className="modal-footer">
                    <button type="submit" className="btn btn-dark mr-5">
                      Save
                    </button>
                  </div>
                </div>
              </form>
              {/* End Content */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStockModal;
