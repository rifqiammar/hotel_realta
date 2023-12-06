import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditVendor = () => {
  const [vendorName, setVendorName] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [regDate, setRegDate] = useState("");
  const [weburl, setWebUrl] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const editVendorHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3005/purchasing/vendor?id=${id}`, {
        vendor_name: vendorName,
        vendor_active: status,
        vendor_priority: priority,
        vendor_modified_date: regDate,
        vendor_url: weburl,
      });

      navigate("/purchasing/vendor");

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
    <div className="container">
      <div className="card shadow mb-4 ">
        <div className="card-body">
          {/* Modal Body */}
          <form onSubmit={editVendorHandler}>
            <div className="row">
              <div className="mb-3 col-md-5">
                <label for="vendorName" className="form-label">
                  Vendor
                </label>
                <input type="text" onChange={(e) => setVendorName(e.target.value)} className="form-control" id="vendorName" required />
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
                  Modified Date
                </label>
                <input type="date" className="form-control" id="RegisterDate" onChange={(e) => setRegDate(e.target.value)} required />
              </div>

              <div className="mb-3 col-md-7">
                <label for="website" className="form-label">
                  Site
                </label>
                <input type="text" className="form-control" id="website" placeholder="www.berkah.com" onChange={(e) => setWebUrl(e.target.value)} required />
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
  );
};

export default EditVendor;
