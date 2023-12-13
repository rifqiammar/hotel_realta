import React from "react";
import { FaCircleMinus } from "react-icons/fa6";
import { FaPlusCircle } from "react-icons/fa";

const AddTocartModal = ({ setQtyValue, qtyValue, dataCart, dataCartTemp, setDataCart, setQtyStat }) => {
  const setAddQtyHandler = () => {
    const dataNama = dataCart.find((e) => {
      return e.data.stock.stock_name === dataCartTemp.stock.stock_name;
    });

    // console.log({ dataCartTemp });
    if (dataNama) {
      // Mencari Index
      const index = dataCart.findIndex((value) => value.data.stock.stock_name === dataCartTemp.stock.stock_name);
      dataCart[index].QtyProd = qtyValue;
      setQtyStat(true);

      // dataCart[index].QtyProd = 1;
      console.log({ dataNama }, "Data Sudah Ada, Tidak di tambahkan");

      return;
    }
    const data = dataCartTemp;
    const newData = { data, QtyProd: qtyValue };
    setDataCart((dataCart) => [...dataCart, newData]); // Push Data
    setQtyStat(true);
  };

  return (
    <div class="modal fade" id="addTocartModal" tabindex="-1" aria-labelledby="addTocartModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="addTocartModalLabel">
              Tambahkan ke Cart
            </h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <p>Qty Product</p>
              <div className="d-flex">
                <button
                  className="buttonClear"
                  onClick={(e) => {
                    e.preventDefault();
                    setQtyValue(qtyValue - 1);
                  }}
                >
                  <FaCircleMinus />
                </button>
                <div className=" mx-3 my-3 d-flex justify-content-center" style={{ width: "3rem", height: "1.5rem", borderBottom: "1px solid grey" }}>
                  <p>{qtyValue}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setQtyValue(qtyValue + 1);
                  }}
                  className="buttonClear"
                >
                  <FaPlusCircle />
                </button>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button onClick={setAddQtyHandler} type="button" class="btn btn-primary" data-bs-dismiss="modal">
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTocartModal;
