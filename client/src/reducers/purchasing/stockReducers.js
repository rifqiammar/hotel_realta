import { GET_LIST_STOCK, GET_LIST_DETAILSTOCK, GET_DATA_STOCK, DATA_STOCK } from "../../actions/purchasing/stockAction";

const initialState = {
  dataStockResult: false,

  getListStockResult: false,
  getListStockLoading: false,
  getListStockError: false,

  getListDetailStockResult: false,
  getListDetailStockLoading: false,
  getListDetailStockError: false,

  getDataStockResult: false,
  getDataStockLoading: false,
  getDataStockError: false,
};

const stockReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_STOCK:
      return {
        ...state,
        getListStockResult: action.payload.data,
        getListStockLoading: action.payload.loading,
        getListStockError: action.payload.errorMessage,
      };
    case GET_LIST_DETAILSTOCK:
      return {
        ...state,
        getListDetailStockResult: action.payload.data,
        getListDetailStockLoading: action.payload.loading,
        getListDetailStockError: action.payload.errorMessage,
      };
    case GET_DATA_STOCK:
      return {
        ...state,
        getDataStockResult: action.payload.data,
        getDataStockLoading: action.payload.loading,
        getDataStockError: action.payload.errorMessage,
      };
    case DATA_STOCK:
      return {
        ...state,
        dataStockResult: action.payload,
      };

    default:
      return state;
  }
};

export default stockReducers;
