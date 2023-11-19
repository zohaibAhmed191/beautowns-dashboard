import React, { useState, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import apis from "../../services";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import imageIcon from "../assets/imageIcon.png";
import { TbPhotoEdit } from "react-icons/tb";

const AddCategoryModal = ({ showModal, setShowModal, getCategories }) => {
  const { storeInfo } = useSelector((e) => e?.user);
  const [previewImage, setPreviewImage] = useState(null);

  const [data, setData] = useState({
    store_Id: storeInfo?._id,
    name: "",
    image: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const { mutate, isLoading } = useMutation(apis.add_service_category, {
    onError: function ({ message }) {
      toast.error(message?.message, { id: 1 });
    },
    onSuccess: ({ data: user, status }) => {
      if (status === 201) {
        setData(null);
        setPreviewImage(null);
        setShowModal(false);
        getCategories();
        toast.success(user?.message, { id: 1 });
      }
    },
  });

  const save_category = (e) => {
    e.preventDefault();
    const form_data = new FormData();
    for (const [key, value] of Object.entries(data)) {
      form_data.append(key, value);
    }
    if (data?.name && data?.image) {
      mutate(form_data);
    } else {
      toast.error("Please select image");
    }
  };

  const fileInputRef = useRef();

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleFileSelection = () => {
    const selectedFile = fileInputRef.current.files[0];
    setPreviewImage(URL.createObjectURL(selectedFile));
    setData((prevData) => ({
      ...prevData,
      image: selectedFile,
    }));
  };

  return (
    <div>
      <Modal centered show={showModal} onHide={setShowModal}>
        <Modal.Body className="">
          <div className="container">
            <form onSubmit={save_category}>
              <h2 className="fw-bold text-uppercase mb-3">Add Category</h2>

              <img
                src={previewImage || imageIcon}
                onClick={triggerFileInput}
                className="img-fluid d-block mx-auto salonProfileImage"
                alt="cate"
              />
              <TbPhotoEdit
                onClick={triggerFileInput}
                className="text-center hc d-block mx-auto fs-4 mt-1"
              />

              <div className="mb-3">
                <label htmlFor="" className="ms-3">
                  Category Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  onChange={onChange}
                  className="form-control"
                />
              </div>

              <input
                type="file"
                name="image"
                accept="image/png, image/gif, image/jpeg"
                onChange={handleFileSelection}
                ref={fileInputRef}
                className="d-none"
              />

              <div className="col-lg-4 col-md-6 col-sm-10 mx-auto">
                <button
                  className="login-btn mt-3 mb-2 fw-bold"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? <Spinner /> : "ADD"}
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddCategoryModal;
