import axios from "axios";

export const GET_LIST_VENDOR = "GET_LIST_VENDOR";
export const GET_VENDOR_PRODUCT = "GET_VENDOR_PRODUCT";

// Get List Vendor
export const getListVendor = (page, limit, priority, keyword) => {
  return async (dispatch) => {
    // Loading
    dispatch({
      type: GET_LIST_VENDOR,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    try {
      // Get API
      console.log({ page, limit, priority, keyword });
      const result = await axios.get(`http://localhost:3005/purchasing/vendor?page=${page}&limit=${limit}&priority=${priority}&search=${keyword}`);

      //   Success and get Result
      dispatch({
        type: GET_LIST_VENDOR,
        payload: {
          loading: false,
          data: result.data,
          errorMessage: false,
        },
      });
    } catch (error) {
      console.log("Gagal dapat Data :", error);
      dispatch({
        type: GET_LIST_VENDOR,
        payload: {
          loading: false,
          data: false,
          errorMessage: error.message,
        },
      });
    }
  };
};

// Delete Vendor
export const deleteVendor = async (id) => {
  try {
    await axios.delete(`http://localhost:3005/purchasing/vendor?id=${id}`);
  } catch (error) {
    console.log({ Delete: error.message });
  }
};

export const searchVendorProduct = async (keyword) => {
  try {
    const result = await axios.get(`http://localhost:3005/purchasing/stocksearch?search=${keyword}`);
    return result;
  } catch (error) {
    console.log({ Delete: error.message });
  }
};

// Get Vendor Product
export const getVendorProduct = (vendorId, page, limit) => {
  return async (dispatch) => {
    // Loading
    dispatch({
      type: GET_VENDOR_PRODUCT,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    try {
      // Get API
      const result = await axios.get(`http://localhost:3005/purchasing/vendorproduct?vepro_vendor_id=${vendorId}&page=${page}&limit=${limit}`);

      //   Success and get Result
      dispatch({
        type: GET_VENDOR_PRODUCT,
        payload: {
          loading: false,
          data: result.data,
          errorMessage: false,
        },
      });
    } catch (error) {
      console.log("Gagal dapat Data :", error);
      dispatch({
        type: GET_VENDOR_PRODUCT,
        payload: {
          loading: false,
          data: false,
          errorMessage: error.message,
        },
      });
    }
  };
};
