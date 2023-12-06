import React from "react";
import currency from "../../../../helper/currency";

const VendorProductContent = ({ i, Vproduct }) => {
  return (
    <>
      <tr key={Vproduct.vepro_id}>
        <th className="text-gray-800 ms-3" scope="row">
          {i}
        </th>
        <td>{Vproduct.stock.stock_name}</td>
        <td>{Vproduct.vepro_qty_stocked}</td>
        <td>{Vproduct.vepro_qty_remaining}</td>
        <td>{currency(Vproduct.vepro_price)}</td>
      </tr>
    </>
  );
};

export default VendorProductContent;
