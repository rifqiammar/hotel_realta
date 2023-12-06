import { GET_LIST_GALLERY } from "../../actions/purchasing/galleryAction";

const initialState = {
  getListGalleryResult: false,
  getListGalleryLoading: false,
  getListGalleryError: false,
};

const galleryReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_GALLERY:
      return {
        ...state,
        getListGalleryResult: action.payload.data,
        getListGalleryLoading: action.payload.loading,
        getListGalleryError: action.payload.errorMessage,
      };

    default:
      return state;
  }
};

export default galleryReducers;
