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
