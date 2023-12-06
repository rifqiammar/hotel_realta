import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const AddModal = () => {
  const [stockName, setStockName] = useState("");
  const [reOrder, setreOrder] = useState(0);
  const [Quantity, setQuantity] = useState(0);
  const [used, setUsed] = useState(0);
  const [Scrap, setScrap] = useState(0);
  const [Size, setSize] = useState("");
  const [Color, setColor] = useState("");
  const [Description, setDescription] = useState("");

  const addStockHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3005/purchasing/stock", {
        stock_name: stockName,
        stock_quantity: Quantity,
        stock_reorder_point: reOrder,
        stock_used: used,
        stock_size: Size,
        stock_scrap: Scrap,
        stock_color: Color,
        stock_description: Description,
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
              Add Stock
            </h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={addStockHandler}>
              <div className="row">
                <div className="mb-3 col-md-5">
                  <label for="stockName" className="form-label">
                    Stock
                  </label>
                  <input placeholder="Spring Bed" type="text" value={stockName} onChange={(e) => setStockName(e.target.value)} className="form-control" id="stock" required />
                </div>

                <div class="col-md-3 mb-3">
                  <label for="reOrder">Re-Order Point</label>
                  <input type="number" onChange={(e) => setreOrder(e.target.value)} class="form-control" id="reOrder" placeholder="0" required />
                </div>

                <div class="col-md-3 mb-3">
                  <label for="quantity">Quantity</label>
                  <input type="number" onChange={(e) => setQuantity(e.target.value)} class="form-control" id="quantity" placeholder="0" required />
                </div>

                <div class="col-md-3 mb-3">
                  <label for="used">Used</label>
                  <input type="number" onChange={(e) => setUsed(e.target.value)} class="form-control" id="used" placeholder="0" required />
                </div>

                <div class="col-md-3 mb-3">
                  <label for="scrap">Scrap</label>
                  <input type="number" onChange={(e) => setScrap(e.target.value)} class="form-control" id="scrap" placeholder="0" required />
                </div>

                <div class="col-md-3 mb-3">
                  <label for="size">Size</label>
                  <input type="text" value={Size} onChange={(e) => setSize(e.target.value)} class="form-control" id="size" placeholder="A1" required />
                </div>

                <div class="col-md-3 mb-5">
                  <label for="color">Color</label>
                  <input type="text" value={Color} onChange={(e) => setColor(e.target.value)} class="form-control" id="color" placeholder="Monocrom" required />
                </div>

                <div class="form-group">
                  <label for="description">Description</label>
                  <textarea class="form-control" value={Description} onChange={(e) => setDescription(e.target.value)} id="description" rows="3" placeholder="Description..."></textarea>
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

export default AddModal;
