import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import axios from "axios";

const UploadModal = ({ stockId }) => {
  const [image, setImage] = useState(undefined);
  const [image2, setImage2] = useState(undefined);
  const [image3, setImage3] = useState(undefined);
  const [image4, setImage4] = useState(undefined);

  const [imageShow, setImageShow] = useState(require("../../../photos/no_image.jpg"));
  const [image2Show, setImage2Show] = useState(require("../../../photos/no_image.jpg"));
  const [image3Show, setImage3Show] = useState(require("../../../photos/no_image.jpg"));
  const [image4Show, setImage4Show] = useState(require("../../../photos/no_image.jpg"));

  //   const [primary, setPrimary] = useState(false);

  const addImageHandler = async (e) => {
    e.preventDefault();

    try {
      if (image) {
        const formData = new FormData();
        formData.append("stock_photo", image);
        formData.append("spho_primary", "true");

        await axios.post(`http://localhost:3005/purchasing/stockphoto?id=${stockId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      if (image2) {
        const formData = new FormData();
        formData.append("stock_photo", image2);
        formData.append("spho_primary", "false");

        await axios.post(`http://localhost:3005/purchasing/stockphoto?id=${stockId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      if (image2) {
        const formData = new FormData();
        formData.append("stock_photo", image3);
        formData.append("spho_primary", "false");

        await axios.post(`http://localhost:3005/purchasing/stockphoto?id=${stockId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      if (image2) {
        const formData = new FormData();
        formData.append("stock_photo", image4);
        formData.append("spho_primary", "false");

        await axios.post(`http://localhost:3005/purchasing/stockphoto?id=${stockId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Vendor has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Vendor Failed to save!",
      });
      console.log(error.message);
    }
  };

  // Function to handle image selection
  const handleImageChange = (event, setImageShowNumber, setImageNum) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      setImageShowNumber(URL.createObjectURL(selectedImage));
      setImageNum(event.target.files[0]);
    }
  };

  const removeImage = (setImg, setImgShow) => {
    setImg(undefined);
    setImgShow(require("../../../photos/no_image.jpg"));
  };

  return (
    <div className="modal fade" id="uploadModal" tabindex="-1" aria-labelledby="uploadModal" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="uploadModal">
              Add Stock
            </h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={addImageHandler}>
              <div className="row">
                <div className="form-group ms-1 col">
                  <img src={imageShow} style={{ width: "200px" }} className="img-thumbnail" alt="..." />
                  <input type="file" className="form-control custom-upload-btn" onChange={(e) => handleImageChange(e, setImageShow, setImage)} id="exampleFormControlFile1" />
                  {image ? image.size > 2 * 1000 * 300 ? <p className="text-danger">File Terlalu Besar</p> : "" : ""}
                  {/* <input type="checkbox" id="exampleCheck1" className="ms-2" onChange={(e) => setPrimary(e.target.value)} />
                  <label class="form-check-label mt-3 ms-2" style={{ fontSize: "13px" }} for="exampleCheck1">
                    Set As Primary
                  </label> */}
                  <button
                    onClick={() => {
                      removeImage(setImage, setImageShow);
                    }}
                    className="mt-3 ms-5"
                    type="button"
                  >
                    <MdDelete />
                    <span className="ms-1">remove</span>
                  </button>
                </div>

                <div class="form-group mx-1 col">
                  <img src={image2Show} style={{ width: "200px" }} class="img-thumbnail" alt="..." />
                  <input type="file" class="form-control custom-upload-btn" onChange={(e) => handleImageChange(e, setImage2Show, setImage2)} id="exampleFormControlFile1" />
                  {image2 ? image2.size > 2 * 1000 * 300 ? <p className="text-danger">File Terlalu Besar</p> : "" : ""}
                  {/* <input type="checkbox" id="exampleCheck1" />
                  <label class="form-check-label mt-3 ms-2" style={{ fontSize: "13px" }} for="exampleCheck1">
                    Set As Primary
                  </label> */}
                  <button
                    onClick={() => {
                      removeImage(setImage2, setImage2Show);
                    }}
                    className="mt-3 ms-5"
                    type="button"
                  >
                    <MdDelete />
                    <span className="ms-1">remove</span>
                  </button>
                </div>

                <div class="form-group col">
                  <img src={image3Show} style={{ width: "200px" }} class="img-thumbnail" alt="..." />
                  <input type="file" class="form-control custom-upload-btn" onChange={(e) => handleImageChange(e, setImage3Show, setImage3)} id="exampleFormControlFile1" />
                  {image3 ? image3.size > 2 * 1000 * 300 ? <p className="text-danger">File Terlalu Besar</p> : "" : ""}
                  {/* <input type="checkbox" id="exampleCheck1" />
                  <label class="form-check-label mt-3 ms-2" style={{ fontSize: "13px" }} for="exampleCheck1">
                    Set As Primary
                  </label> */}
                  <button
                    onClick={() => {
                      removeImage(setImage3, setImage3Show);
                    }}
                    className="mt-3 ms-5"
                    type="button"
                  >
                    <MdDelete />
                    <span className="ms-1">remove</span>
                  </button>
                </div>

                <div class="form-group mx-1 col">
                  <img src={image4Show} style={{ width: "200px" }} class="img-thumbnail" alt="..." />
                  <input type="file" class="form-control custom-upload-btn" onChange={(e) => handleImageChange(e, setImage4Show, setImage4)} id="exampleFormControlFile1" />
                  {image4 ? image4.size > 2 * 1000 * 300 ? <p className="text-danger">File Terlalu Besar</p> : "" : ""}
                  {/* <input type="checkbox" id="exampleCheck1" />
                  <label class="form-check-label mt-3 ms-2" style={{ fontSize: "13px" }} for="exampleCheck1">
                    Set As Primary
                  </label> */}
                  <button
                    onClick={() => {
                      removeImage(setImage4, setImage4Show);
                    }}
                    className="mt-3 ms-5"
                    type="button"
                  >
                    <MdDelete />
                    <span className="ms-1">remove</span>
                  </button>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Close
                  </button>
                  <button type="submit" className="btn btn-dark" data-bs-dismiss="modal">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
