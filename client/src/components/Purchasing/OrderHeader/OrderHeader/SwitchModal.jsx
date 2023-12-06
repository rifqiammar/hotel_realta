import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const SwitchModal = ({ orderId }) => {
  const [status, setStatus] = useState("");

  const editSwitch = async (e) => {
    e.preventDefault();

    console.log(orderId);

    try {
      await axios.put(`http://localhost:3005/purchasing/orderheader?idOrder=${orderId}`, {
        pohe_status: status,
      });

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
    <div className="modal fade" id="switchModal" tabindex="-1" aria-labelledby="switchModal" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="switchModal">
              Switch Status
            </h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={editSwitch}>
              <div className="row">
                <div className="mb-3 col-md-3">
                  <label for="priority" className="form-label">
                    Status
                  </label>
                  <select className="form-select" id="priority" onChange={(e) => setStatus(e.target.value)} required>
                    <option>Status</option>
                    <option value="1">Pending</option>
                    <option value="2">Approve</option>
                    <option value="3">Rejected</option>
                    <option value="4">Received</option>
                    <option value="5">Completed</option>
                  </select>
                </div>
                <div />

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

export default SwitchModal;
