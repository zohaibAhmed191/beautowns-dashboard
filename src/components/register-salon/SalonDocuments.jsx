import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import apis from "../../services";
import toast from "react-hot-toast";
import { set_store_info } from "../../redux/slices/userSlice";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SalonDocuments = ({ setShowModal }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { storeInfo } = useSelector((e) => e.user);
  const [data, setData] = useState({ documents: [] });
  const [selectedImages, setSelectedImages] = useState([]);
  const handleImageChange = (e) => {
    const files = e.target.files;
    const imageArray = Array.from(files);
    setSelectedImages([...selectedImages, ...imageArray]);
    setData((prevState) => ({
      ...prevState,
      documents: [...prevState.documents, ...imageArray],
    }));
  };

  const removeImage = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
    const updatedData = [...data.documents];
    updatedData.splice(index, 1);
    setData((prevState) => ({ ...prevState, documents: updatedData }));
  };
  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form_data = new FormData();
    for (let i = 0; i < data.documents.length; i++) {
      form_data.append("documents", data.documents[i]);
    }

    try {
      const response = await apis.updateStoreTime(storeInfo?._id, {
        completeProgess: 3,
        ...form_data,
      });
      if (response?.data?.message && response?.data?.store) {
        navigate("/dashboard")
        dispatch(set_store_info(response?.data?.store));
        toast.success(response?.data?.message);
      }
      setShowModal(false);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 className="fw-bold text-uppercase mb-3">Upload Documents</h2>
      <form onSubmit={handleUpload} encType="multipart/form-data">
        <input
          type="file"
          required
          className="form-control"
          onChange={handleImageChange}
          multiple
        />
        <div className="row">
          {data?.documents?.map((preview, index) => (
            <div className="col-md-6 my-3" key={index}>
              <img
                src={URL.createObjectURL(preview)}
                alt={`Preview ${index}`}
                style={{ maxWidth: "100%" }}
              />
              <br />
              <button
                className="btn btn-secondary"
                onClick={() => removeImage(index)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        {data?.documents?.length > 0 && (
          <div className="col-lg-4 col-md-6 col-sm-10">
            <button className="login-btn mt-3 mb-2 fw-bold">
              {loading ? <Spinner /> : "SAVE"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default SalonDocuments;
