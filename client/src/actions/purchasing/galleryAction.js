import axios from "axios";

export const GET_LIST_GALLERY = "GET_LIST_GALLERY";

export const getListGallery = (page, search, urutan) => {
  return async (dispatch) => {
    // Loading
    dispatch({
      type: GET_LIST_GALLERY,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    try {
      // Get API
      const result = await axios.get(`http://localhost:3005/purchasing/gallery?page=${page}&search=${search}&urutan=${urutan}`);

      //   Success and get Result
      dispatch({
        type: GET_LIST_GALLERY,
        payload: {
          loading: false,
          data: result.data,
          errorMessage: false,
        },
      });
    } catch (error) {
      console.log("Gagal dapat Data :", error);
      dispatch({
        type: GET_LIST_GALLERY,
        payload: {
          loading: false,
          data: false,
          errorMessage: error.message,
        },
      });
    }
  };
};

export const addOrders = async (dataCart, stockId) => {
  console.log(dataCart, stockId);
  const { pohe_total_amount, pode_line_total, pode_order_qty, pode_price, pohe_subtotal, pohe_tax, pohe_vendor_id } = dataCart;
  const data = {
    pohe_subtotal,
    pohe_tax,
    pohe_total_amount,
    pohe_emp_id: 1,
    pohe_status: 1,
    pohe_vendor_id,
    pode_stock_id: stockId,
    pode_price,
    pode_order_qty,
    pode_line_total,
  };
  try {
    await axios.post("http://localhost:3005/purchasing/orderheader", data);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};
