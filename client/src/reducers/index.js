import { combineReducers } from "redux";
import { vendorReducers, stockReducers, galleryReducers, orderReducers, orderDataReducers } from "./purchasing";

export default combineReducers({
  vendorReducers,
  stockReducers,
  galleryReducers,
  orderReducers,
  orderDataReducers,
});
