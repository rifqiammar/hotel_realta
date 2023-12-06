import axios from "axios";

export const GET_LIST_STOCK = "GET_LIST_STOCK";
export const GET_LIST_DETAILSTOCK = "GET_LIST_DETAILSTOCK";
export const GET_DATA_STOCK = "GET_DATA_STOCK";
export const DATA_STOCK = "DATA_STOCK";

export const getListStock = (page, limit, search, urutan) => {
  return async (dispatch) => {
    // Loading
    dispatch({
      type: GET_LIST_STOCK,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    try {
      // Get API
      console.log({ page, limit, search });
      const result = await axios.get(`http://localhost:3005/purchasing/stock?limit=${limit}&page=${page}&search=${search}&urutan=${urutan}`);

      //   Success and get Result
      dispatch({
        type: GET_LIST_STOCK,
        payload: {
          loading: false,
          data: result.data,
          errorMessage: false,
        },
      });
    } catch (error) {
      console.log("Gagal dapat Data :", error);
      dispatch({
        type: GET_LIST_STOCK,
        payload: {
          loading: false,
          data: false,
          errorMessage: error.message,
        },
      });
    }
  };
};

export const deleteStock = async (id) => {
  try {
    await axios.delete(`http://localhost:3005/purchasing/stock?id=${id}`);
  } catch (error) {
    console.log({ Delete: error.message });
  }
};

export const deleteStockDetail = async (id) => {
  try {
    await axios.delete(`http://localhost:3005/purchasing/stockdetail?idStockDet=${id}`);
  } catch (error) {
    console.log({ Delete: error.message });
  }
};

export const addStockDetail = async (stockId) => {
  try {
    await axios.post(`http://localhost:3005/purchasing/stockdetail`, {
      stod_stock_id: stockId,
      stod_faci_id: 1,
      stod_pohe_id: 1,
      stod_status: 1,
    });
  } catch (error) {
    console.log({ POST: error.message });
  }
};

export const getDetailStock = (stockId) => {
  return async (dispatch) => {
    // Loading
    dispatch({
      type: GET_LIST_DETAILSTOCK,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    try {
      // Get API
      const result = await axios.get(`http://localhost:3005/purchasing/stockdetail?idStockDet=${stockId}`);
      //   Success and get Result
      console.log({ resultDetail: result });
      dispatch({
        type: GET_LIST_DETAILSTOCK,
        payload: {
          loading: false,
          data: result.data,
          errorMessage: false,
        },
      });
    } catch (error) {
      console.log("Gagal dapat Data :", error);
      dispatch({
        type: GET_LIST_DETAILSTOCK,
        payload: {
          loading: false,
          data: false,
          errorMessage: error.message,
        },
      });
    }
  };
};

export const dataStock = (data) => {
  return {
    type: "DATA_STOCK",
    payload: data,
  };
};
