import { GET_LIST_VENDOR, GET_VENDOR_PRODUCT } from "../../actions/purchasing/vendorActions";

const initialState = {
  getListVendorResult: false,
  getListVendorLoading: false,
  getListVendorError: false,

  getVendorProductResult: false,
  getVendorProductLoading: false,
  getVendorProductError: false,
};

const vendorReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_VENDOR:
      return {
        ...state,
        getListVendorResult: action.payload.data,
        getListVendorLoading: action.payload.loading,
        getListVendorError: action.payload.errorMessage,
      };
    case GET_VENDOR_PRODUCT:
      return {
        ...state,
        getVendorProductResult: action.payload.data,
        getVendorProductLoading: action.payload.loading,
        getVendorProductError: action.payload.errorMessage,
      };

    default:
      return state;
  }
};

export default vendorReducers;
