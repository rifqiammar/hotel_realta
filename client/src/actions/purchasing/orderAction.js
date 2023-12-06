import axios from "axios";
export const GET_LIST_ORDER = "GET_LIST_ORDER";
export const GET_LIST_DETAIL = "GET_LIST_DETAIL";
export const ORDER_DATA = "ORDER_DATA";
export const ORDER_DATA_DETAIL = "ORDER_DATA_DETAIL";

export const getListOrder = (page, limit, keyword, status) => {
  return async (dispatch) => {
    // Loading
    dispatch({
      type: GET_LIST_ORDER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    try {
      // Get API
      const result = await axios.get(`http://localhost:3005/purchasing/orderheader?page=${page}&search=${keyword}&status=${status}`);

      //   Success and get Result
      dispatch({
        type: GET_LIST_ORDER,
        payload: {
          loading: false,
          data: result.data,
          errorMessage: false,
        },
      });
    } catch (error) {
      console.log("Gagal dapat Data :", error);
      dispatch({
        type: GET_LIST_ORDER,
        payload: {
          loading: false,
          data: false,
          errorMessage: error.message,
        },
      });
    }
  };
};

export const deleteOrder = async (idOrder) => {
  try {
    await axios.delete(`http://localhost:3005/purchasing/orderheader?idOrder=${idOrder}`);
  } catch (error) {
    console.log({ Delete: error.message });
  }
};

export const deleteOrderDetail = async (ponumber, id) => {
  try {
    console.log({ ponumber, id });
    await axios.delete(`http://localhost:3005/purchasing/orderheaderdetail?ponum=${ponumber}&idPode=${id}`);
  } catch (error) {
    console.log({ Delete: error.message });
  }
};

export const getListDetail = (ponumber) => {
  return async (dispatch) => {
    // Loading
    dispatch({
      type: GET_LIST_DETAIL,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    try {
      // Get API
      const result = await axios.get(`http://localhost:3005/purchasing/orderheaderdetail?ponumber=${ponumber}`);
      //   Success and get Result
      console.log({ result });
      dispatch({
        type: GET_LIST_DETAIL,
        payload: {
          loading: false,
          data: result.data,
          errorMessage: false,
        },
      });
    } catch (error) {
      console.log("Gagal dapat Data :", error);
      dispatch({
        type: GET_LIST_DETAIL,
        payload: {
          loading: false,
          data: false,
          errorMessage: error.message,
        },
      });
    }
  };
};

export const dataOrder = (data) => {
  console.log({ data });
  return {
    type: "ORDER_DATA",
    payload: data,
  };
};

export const addDataOrderDetail = (data) => {
  console.log({ dataOrderDetail: data });
  return {
    type: "ORDER_DATA_DETAIL",
    payload: data,
  };
};
