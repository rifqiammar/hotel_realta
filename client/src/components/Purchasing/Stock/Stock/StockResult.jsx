import React from "react";
import { CgMenuRight } from "react-icons/cg";

// import EditVendor from "../EditVendor";

const StockResult = ({ i, stock, deleteDataStock, getStockId, addStockDetailHandler }) => {
  return (
    <>
      <tr key={stock.stock_id}>
        <th className="text-gray-800 ms-3" scope="row">
          {i}
        </th>
        <td>{stock.stock_name}</td>
        <td>{stock.stock_reorder_point}</td>
        <td>{stock.stock_quantity}</td>
        <td>{stock.stock_used}</td>
        <td>{stock.stock_scrap}</td>
        <td>{stock.stock_size}</td>
        <td>{stock.stock_color}</td>
        <td>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <CgMenuRight />
            </button>
            <ul class="dropdown-menu">
              <li>
                <button className="btn btn-light" onClick={() => getStockId(stock.stock_id, stock)} type="button" data-bs-toggle="modal" data-bs-target="#editModal">
                  <span className="ms-1">Edit</span>
                </button>
              </li>
              <li>
                <button className="btn btn-light" onClick={() => getStockId(stock.stock_id, stock)} type="button" data-bs-toggle="modal" data-bs-target="#uploadModal">
                  Upload Photo
                </button>
              </li>
              <li>
                <button className="btn btn-light" onClick={() => deleteDataStock(stock.stock_id)} class="dropdown-item">
                  <h6 className="font-weight-normal">Delete</h6>
                </button>
              </li>
              {/* <li>
                <a class="dropdown-item" href={`/purchasing/stock/${stock.stock_id}`}>
                  <h6 className="font-weight-normal">Detail Info Stock</h6>
                </a>
              </li> */}
              <li>
                <button class="dropdown-item" onClick={() => addStockDetailHandler(stock.stock_name, stock.stock_id)}>
                  <h6 className="font-weight-normal">Detail Info Stock</h6>
                </button>
              </li>
            </ul>
          </div>
        </td>
      </tr>
    </>
  );
};

export default StockResult;
