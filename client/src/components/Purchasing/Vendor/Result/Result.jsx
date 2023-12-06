import React from "react";
import { CgMenuRight } from "react-icons/cg";

import { dateCon } from "../../../../helper/date";
// import EditVendor from "../EditVendor";

const Result = ({ i, vendor, deleteDataVendor }) => {
  return (
    <>
      <tr key={vendor.vendor_entity_id}>
        <th className="text-gray-800 ms-3" scope="row">
          {i}
        </th>
        <td>{vendor.vendor_name}</td>
        <td>{vendor.vendor_active ? "Active" : "InActive"}</td>
        <td>{vendor.vendor_priority ? "Highest" : "Lowest"}</td>
        <td>{dateCon(vendor.vendor_register_date)}</td>
        <td>
          <a href={`https://${vendor.vendor_weburl}`} target="_blank" rel="noopener noreferrer" className="link-underline-light link-dark">
            {vendor.vendor_weburl}
          </a>
        </td>
        <td>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <CgMenuRight />
            </button>
            <ul class="dropdown-menu">
              <li>
                <a href={`vendor/edit/${vendor.vendor_entity_id}`} class="dropdown-item">
                  Edit
                </a>
              </li>
              <li>
                <a class="dropdown-item" href={`vendor/${vendor.vendor_entity_id}/addproduk`}>
                  Add Item Product
                </a>
              </li>
              <li>
                <button onClick={() => deleteDataVendor(vendor.vendor_entity_id)} class="dropdown-item">
                  Delete
                </button>
              </li>
            </ul>
          </div>
        </td>
      </tr>
    </>
  );
};

export default Result;
