import { GET_LIST_ORDER } from "../../actions/purchasing/orderAction";

const initialState = {
  getListOrderResult: false,
  getListOrderLoading: false,
  getListOrderError: false,
};

const orderReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_ORDER:
      return {
        ...state,
        getListOrderResult: action.payload.data,
        getListOrderLoading: action.payload.loading,
        getListOrderError: action.payload.errorMessage,
      };

    default:
      return state;
  }
};

export default orderReducers;
