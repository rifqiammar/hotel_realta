import { ORDER_DATA, GET_LIST_DETAIL, ORDER_DATA_DETAIL } from "../../actions/purchasing/orderAction";

const initialState = {
  getDataOrderResult: [],
  getDataOrderLoading: false,

  getDataOrderDetailResult: [],

  getListOrderDetailResult: false,
  getListOrderDetailLoading: false,
  getListOrderDetailError: false,
};

const orderDataReducers = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_DATA_DETAIL:
      return {
        ...state,
        getDataOrderDetailResult: action.payload,
      };
    case ORDER_DATA:
      return {
        ...state,
        getDataOrderResult: action.payload,
        getDataOrderLoading: action.payload.loading,
        getDataOrderError: action.payload.errorMessage,
      };
    case GET_LIST_DETAIL:
      return {
        ...state,
        getListOrderDetailResult: action.payload.data,
        getListOrderDetailLoading: action.payload.loading,
        getListOrderDetailError: action.payload.errorMessage,
      };

    default:
      return state;
  }
};

export default orderDataReducers;
