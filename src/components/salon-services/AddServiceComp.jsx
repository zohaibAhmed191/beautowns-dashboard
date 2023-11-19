import React, { useState, useEffect, useRef } from "react";
import apis from "../../services";
import { useSelector } from "react-redux";
import { errorValidate } from "../../validations/errorHandleJoi";
import { serviceValidate } from "../../validations/ServiceValidation";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { TbPhotoEdit } from "react-icons/tb";
import imageIcon from "../assets/imageIcon.png";

const AddServiceComp = () => {
  const location = useLocation();
  const params = useParams();
  const isEdit = location?.pathname?.includes("update");
  const navigate = useNavigate();
  const { storeInfo } = useSelector((e) => e?.user);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [service, setService] = useState(null);

  const getCategories = async () => {
    try {
      setIsLoading(true);
      const response = await apis.get_all_service_category(storeInfo?._id);
      setIsLoading(false);
      if (response?.data?.storeCategories) {
        setCategories(response?.data?.storeCategories);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const getService = async () => {
    try {
      setIsLoading(true);
      const response = await apis.get_single_service(params?.id);
      setIsLoading(false);
      if (response?.data?.service) {
        setService(response?.data?.service);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
    if (isEdit) {
      getService();
    }
    // eslint-disable-next-line
  }, []);

  const [imagePreview, setImagePreview] = useState(null);

  let [data, setData] = useState({
    store_Id: storeInfo?._id,
    segment_Id: "",
    service_category_Id: "",
    name: "",
    value: "",
    noOfPeople: "",
    duration: "",
    description: "",
    image: "",
  });

  console.log(data, "data");

  useEffect(() => {
    setData({
      store_Id: storeInfo?._id,
      segment_Id: service?.segment_Id,
      service_category_Id: service?.service_category_Id,
      name: service?.name,
      value: service?.value,
      noOfPeople: service?.noOfPeople,
      duration: service?.duration,
      description: service?.description,
      image: service?.image,
    });
  }, [service]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  let [error, setError] = useState();
  console.log(error, "error");
  const { mutate, isLoading: isSubmitting } = useMutation(apis.add_service, {
    onError: function ({ message }) {
      setError("");
      toast.error(message?.message, { id: 1 });
    },
    onSuccess: ({ data: user, status }) => {
      if (status === 201) {
        navigate("/service");
        toast.success(user?.message, { id: 1 });
      }
    },
  });

  const { mutate: updateService, isLoading: updateLoad } = useMutation(
    apis.update_Service,
    {
      onError: function ({ message }) {
        setError("");
        toast.error(message?.message, { id: 1 });
      },
      onSuccess: ({ data: user, status }) => {
        if (status === 200) {
          navigate("/service");
          toast.success(user?.message, { id: 1 });
        }
      },
    }
  );

  const add_Service = (e) => {
    e.preventDefault();
    const form_data = new FormData();
    for (const [key, value] of Object.entries(data)) {
      if (isEdit && key === "store_Id") {
        continue;
      }
      form_data.append(key, value);
    }

    let response = errorValidate(serviceValidate(data));
    if (response === true) {
      if (isEdit) {
        updateService(params?.id, form_data);
      } else {
        mutate(form_data);
      }
    } else {
      setError(response);
    }
  };

  const fileInputRef = useRef();

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleFileSelection = () => {
    const selectedFile = fileInputRef.current.files[0];
    setImagePreview(URL.createObjectURL(selectedFile));
    setData((prevData) => ({
      ...prevData,
      image: selectedFile,
    }));
  };

  return (
    <div className="container">
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleFileSelection}
        ref={fileInputRef}
        className="d-none"
      />
      {isLoading && <div id="cover-spin"></div>}
      <h2 className="mb-4"> {isEdit ? "Update Service" : "Add Service"} </h2>
      <form onSubmit={add_Service}>
        <img
          src={imagePreview || service?.image || imageIcon}
          onClick={triggerFileInput}
          className="img-fluid d-block hc mx-auto salonProfileImage"
          alt="cate"
        />
        <TbPhotoEdit
          onClick={triggerFileInput}
          className="text-center hc d-block mx-auto fs-4 mt-1"
        />
        <div className="row">
          <div className="col-sm-6 col-lg-4">
            <div className="mb-3">
              <label className="text-black ms-3">Service Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={data?.name}
                onChange={onChange}
                className="form-control"
              />
              {error?.name && (
                <div className="text-danger fs-12">{error?.name}</div>
              )}
            </div>
          </div>

          <div className="col-sm-6 col-lg-4">
            <div className="mb-3">
              <label className="text-black ms-3">Service Type</label>
              <select
                className="form-control"
                name="segment_Id"
                value={data?.segment_Id}
                onChange={onChange}
                id="segment_Id"
              >
                <option value="">Choose...</option>
                <option value={1}>Mens</option>
                <option value={2}>Womens</option>
                <option value={3}>Both</option>
              </select>
              {error?.segment_Id && (
                <div className="text-danger fs-12">{error?.segment_Id}</div>
              )}
            </div>
          </div>
          <div className="col-sm-6 col-lg-4">
            <div className="mb-3">
              <label className="text-black ms-3">Service Category</label>
              <select
                className="form-control"
                name="service_category_Id"
                onChange={onChange}
                value={data?.service_category_Id}
              >
                <option value="">Choose...</option>

                {categories?.length > 0 ? (
                  categories?.map((cat, i) => {
                    return (
                      <option value={cat?._id} key={i}>
                        {cat?.name}
                      </option>
                    );
                  })
                ) : (
                  <option disabled>No Service Category Found</option>
                )}
              </select>
              {error?.service_category_Id && (
                <div className="text-danger fs-12">
                  {error?.service_category_Id}
                </div>
              )}
            </div>
          </div>

          <div className="col-sm-6 col-lg-4">
            <div className="mb-3">
              <label className="text-black ms-3">Duration</label>
              <input
                type="number"
                name="duration"
                value={data?.duration}
                id="duration"
                onChange={onChange}
                className="form-control"
              />
              {error?.duration && (
                <div className="text-danger fs-12">{error?.duration}</div>
              )}
            </div>
          </div>

          <div className="col-sm-6 col-lg-4">
            <div className="mb-3">
              <label className="text-black ms-3">No Of Peoples</label>
              <input
                type="number"
                name="noOfPeople"
                id="noOfPeople"
                value={data?.noOfPeople}
                onChange={onChange}
                className="form-control"
              />
              {error?.noOfPeople && (
                <div className="text-danger fs-12">{error?.noOfPeople}</div>
              )}
            </div>
          </div>
          <div className="col-sm-6 col-lg-4">
            <div className="mb-3">
              <label className="text-black ms-3">Price</label>
              <input
                type="number"
                name="value"
                value={data?.value}
                id="value"
                onChange={onChange}
                className="form-control"
              />
              {error?.value && (
                <div className="text-danger fs-12">{error?.value}</div>
              )}
            </div>
          </div>
          <div className="col-sm-12">
            <div className="mb-3">
              <label className="text-black ms-3">Description</label>
              <textarea
                name="description"
                value={data?.description}
                className="form-control rounded-4"
                id=""
                onChange={onChange}
                rows="5"
              ></textarea>
              {error?.description && (
                <div className="text-danger fs-12">{error?.description}</div>
              )}
            </div>
          </div>
          <div className="col-sm-4 mx-auto">
            <button
              className="login-btn"
              type="submit"
              disabled={isSubmitting || updateLoad}
            >
              {isSubmitting || updateLoad ? (
                <Spinner />
              ) : isEdit ? (
                "UPDATE SERVICE"
              ) : (
                "ADD SERVICE"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddServiceComp;
