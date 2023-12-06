import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const ModalVendor = () => {
  const [vendorName, setVendorName] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [regDate, setRegDate] = useState("");
  const [weburl, setWebUrl] = useState("");

  const addVendorHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3005/purchasing/vendor", {
        entityId: 17,
        vendor_name: vendorName,
        vendor_active: status,
        vendor_priority: priority,
        register_date: regDate,
        vendor_url: weburl,
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
    <div className="modal fade" id="addModal" tabindex="-1" aria-labelledby="addModal" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="addModal">
              Add/Edit Vendor
            </h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={addVendorHandler}>
              <div className="row">
                <div className="mb-3 col-md-5">
                  <label for="vendorName" className="form-label">
                    Vendor
                  </label>
                  <input type="text" value={vendorName} onChange={(e) => setVendorName(e.target.value)} className="form-control" id="vendorName" required />
                </div>

                <div className="mb-3 col-md-3">
                  <label for="status" className="form-label">
                    Status
                  </label>
                  <select className="form-select" id="status" required onChange={(e) => setStatus(e.target.value)}>
                    <option>choose..</option>
                    <option value="1">Active</option>
                    <option value="0">InActive</option>
                  </select>
                </div>

                <div className="mb-3 col-md-3">
                  <label for="priority" className="form-label">
                    Priority
                  </label>
                  <select className="form-select" id="priority" onChange={(e) => setPriority(e.target.value)} required>
                    <option>choose..</option>
                    <option value="1">Highest</option>
                    <option value="0">Lowest</option>
                  </select>
                </div>

                <div className="mb-3 col-md-5">
                  <label for="RegisterDate" className="form-label">
                    Register Date
                  </label>
                  <input type="date" className="form-control" id="RegisterDate" value={regDate} onChange={(e) => setRegDate(e.target.value)} required />
                </div>

                <div className="mb-3 col-md-7">
                  <label for="website" className="form-label">
                    Site
                  </label>
                  <input type="text" className="form-control" id="website" placeholder="www.url.com" value={weburl} onChange={(e) => setWebUrl(e.target.value)} required />
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

export default ModalVendor;
