import "./App.css";

import { Routes, Route } from "react-router-dom";

import { Vendor, Stock, Gallery, Order } from "./Pages";

function App() {
  return (
    <div>
      <Routes>
        {/* Purchasing */}
        <Route path="/purchasing/vendor" element={<Vendor Content="vendor" />} />
        <Route path="/purchasing/vendor/edit/:id" element={<Vendor Content="editVendor" />} />
        <Route path="/purchasing/vendor/:vendorId/addproduk" element={<Vendor Content="addProduk" />} />
        <Route path="/purchasing/stock" element={<Stock Content="stock" />} />
        <Route path="/purchasing/stock/:id" element={<Stock Content="stockDetail" />} />
        <Route path="/purchasing/gallery" element={<Gallery />} />
        <Route path="/purchasing/listorder" element={<Order Content="OrderHeader" />} />
        <Route path="/purchasing/listorder/:ponumber" element={<Order Content="OrderDetail" />} />
        <Route path="purchasing/listorder/edit/:id" element={<Order Content="OrderDetailEdit" />} />
      </Routes>
    </div>
  );
}

export default App;
