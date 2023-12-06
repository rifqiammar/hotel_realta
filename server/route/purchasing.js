const { Router } = require("express");
const { stockPhoto } = require("../middleware/multer");
const { getVendor, addVendor, updateVendor, deleteVendor, getGallery } = require("../controller/purchasing/vendor");
const { addVproduct, getVproduct, updateVproduct, deleteVproduct } = require("../controller/purchasing/vendorProduct");
const { addStock, getStock, updateStock, deleteStock, searchStock } = require("../controller/purchasing/stock");
const { getPhoto, addPhoto, removePhoto, showPhoto } = require("../controller/purchasing/stockphoto");
const { editStatus, getDetailStock, addDetailStock, deleteDataStockDetail } = require("../controller/purchasing/stockDetail");
const { getStockVendor } = require("../controller/purchasing/stockVendor");
const { genereateBarcode, updateOrederDetail, deleteDataOrderDetail, getDataOrderHeader, addDataOrderHeader, deleteDataOrderHeader, getDataOrderDetail, switchOrder } = require("../controller/purchasing/orderHeader");

const purchasingRoute = Router();

// Vendor routes
purchasingRoute.get("/vendor", getVendor);
purchasingRoute.post("/vendor", addVendor);
purchasingRoute.put("/vendor", updateVendor);
purchasingRoute.delete("/vendor", deleteVendor);

// Vendor Product routes
purchasingRoute.get("/vendorproduct", getVproduct);
purchasingRoute.post("/vendorproduct", addVproduct);
purchasingRoute.put("/vendorproduct", updateVproduct);
purchasingRoute.delete("/vendorproduct", deleteVproduct);

// Stock routes
purchasingRoute.get("/stock", getStock);
purchasingRoute.post("/stock", addStock);
purchasingRoute.put("/stock", updateStock);
purchasingRoute.get("/stocksearch", searchStock);
purchasingRoute.delete("/stock", deleteStock);

// Stock Photo Routes
purchasingRoute.get("/stockphoto", getPhoto);
purchasingRoute.get("/stockphoto/:imgpathname", showPhoto);
purchasingRoute.post("/stockphoto", stockPhoto.single("stock_photo"), addPhoto);
purchasingRoute.delete("/stockphoto", removePhoto);

// Detail Stock Routes
purchasingRoute.get("/stock/:id", getDetailStock);

// Purchasing Galery / Stock And Vendor product
purchasingRoute.get("/stockvendor", getStockVendor);
purchasingRoute.get("/stockvendor/id", getStockVendor);

// Gallery Routes
purchasingRoute.get("/gallery", getGallery);

// OrderHeaderRoute
purchasingRoute.get("/orderheader", getDataOrderHeader);
purchasingRoute.post("/orderheader", addDataOrderHeader);
purchasingRoute.put("/orderheader", switchOrder);
purchasingRoute.delete("/orderheader", deleteDataOrderHeader);
purchasingRoute.get("/orderheaderdetail", getDataOrderDetail);
purchasingRoute.delete("/orderheaderdetail", deleteDataOrderDetail);
purchasingRoute.put("/orderheaderdetail", updateOrederDetail);
purchasingRoute.post("/orderbarcode", genereateBarcode);

purchasingRoute.get("/stockdetail", getDetailStock);
purchasingRoute.post("/stockdetail", addDetailStock);
purchasingRoute.delete("/stockdetail", deleteDataStockDetail);
purchasingRoute.put("/stockdetail", editStatus);

module.exports = purchasingRoute;
