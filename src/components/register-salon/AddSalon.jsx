import React, { useState, useRef } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import apis from "../../services";
import toast from "react-hot-toast";
import imageIcon from "../assets/imageIcon.png";
import { useDispatch, useSelector } from "react-redux";
import { set_store_info } from "../../redux/slices/userSlice";
import { errorValidate } from "../../validations/errorHandleJoi";
import { storeValidate } from "../../validations/StoreValidation";
import { Spinner } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import { TbPhotoEdit } from "react-icons/tb";

const AddSalon = () => {
  const { data: categories, isLoading } = useQuery(
    ["get_store_categories"],
    () => apis.get_store_category()
  );
  const { user } = useSelector((e) => e.user);
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(null);

  const [data, setData] = useState({
    name: "",
    segment_Id: "",
    salon_owner_Id: user?._id,
    category_Id: "",
    country: "",
    city: "",
    phone: "",
    details: "",
    no_of_slots: "",
    location: "",
    latitude: 1234,
    longitude: 4567,
    image: null,
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  let [error, setError] = useState();
  console.log(error, "error");
  const { mutate, isLoading: isSubmitting } = useMutation(apis.create_store, {
    onError: function ({ message }) {
      setError("");
      toast.error(message?.message, { id: 1 });
    },
    onSuccess: ({ data: user, status }) => {
      if (status === 201) {
        setData(null);
        dispatch(set_store_info(user?.store));
        toast.success(user?.message, { id: 1 });
      }
    },
  });

  const create__store = (e) => {
    e.preventDefault();
    const form_data = new FormData();
    for (const [key, value] of Object.entries(data)) {
      form_data.append(key, value);
    }
    let response = errorValidate(storeValidate(data));
    if (response === true) {
      mutate(form_data);
      // toast.success("valid data", { id: 1 });
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
      {isLoading && <div id="cover-spin"></div>}
      <h2 className="fw-bold text-uppercase">Register Store</h2>
      <form onSubmit={create__store}>
        <input
          type="file"
          name="image"
          accept="image/*"
          className="d-none"
          onChange={handleFileSelection}
          ref={fileInputRef}
        />

        <img
          src={imagePreview || imageIcon}
          className="img-fluid d-block mx-auto salonProfileImage"
          alt=""
        />
        <TbPhotoEdit
                onClick={triggerFileInput}
                className="text-center hc d-block mx-auto fs-4 mt-1"
              />

        <div className="row">
          <div className="col-md-6 mt-3">
            <div className="form-group">
              <label className="ms-3">Salon Name</label>
              <input
                type="text"
                name="name"
                onChange={onChange}
                className="form-control"
              />
              {error?.name && <p className="text-danger m-0">{error?.name}</p>}
            </div>
          </div>
          <div className="col-md-6 mt-3">
            <div className="form-group">
              <label className="ms-3">Salon Type</label>
              <select
                id="inputState"
                onChange={onChange}
                name="segment_Id"
                className="form-control"
              >
                <option value="" disabled="" selected="">
                  Choose...
                </option>
                <option value={1}>Gents</option>
                <option value={2}>Ladies</option>
                <option value={3}>Both</option>
              </select>
              {error?.segment_Id && (
                <p className="text-danger m-0">{error?.segment_Id}</p>
              )}
            </div>
          </div>
          <div className="col-md-6 mt-3">
            <div className="form-group">
              <label className="ms-3">Salon Category</label>
              <select
                id="inputState"
                onChange={onChange}
                name="category_Id"
                className="form-control"
              >
                <option value="option" disabled="" selected="">
                  Choose...
                </option>
                {categories?.data?.categories?.length > 0 &&
                  categories?.data?.categories?.map((cat) => {
                    return <option value={cat?._id}>{cat?.name}</option>;
                  })}
              </select>
              {error?.category_Id && (
                <p className="text-danger m-0">{error?.category_Id}</p>
              )}
            </div>
          </div>
          <div className="col-md-6 mt-3">
            <div className="form-group">
              <label className="ms-3">Salon Phone</label>
              <PhoneInput
                country={"pk"}
                value={data?.phone}
                name="phone"
                onChange={(value) => setData({ ...data, phone: value })}
              />
              {error?.phone && (
                <p className="text-danger m-0">{error?.phone}</p>
              )}
            </div>
          </div>
          <div className="col-md-6 mt-3">
            <div className="form-group">
              <label className="ms-3">Country</label>
              <select
                id="inputState"
                onChange={onChange}
                name="country"
                className="form-control"
              >
                <option value="" disabled="" selected="">
                  Choose...
                </option>
                <option>Pakistan</option>
              </select>
              {error?.country && (
                <p className="text-danger m-0">{error?.country}</p>
              )}
            </div>
          </div>

          <div className="col-md-6 mt-3">
            <div className="form-group">
              <label className="ms-3">City</label>
              <select
                id="inputState"
                onChange={onChange}
                name="city"
                className="form-control"
              >
                <option value="option" disabled="" selected="">
                  Choose...
                </option>
                <option value="Karachi">Karachi</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Sukkar">Sukkar</option>
                <option value="Lahore">Lahore</option>
                <option value="Islamabad">Islamabad</option>
                <option value="Quetta">Quetta</option>
                <option value="Peshawar">Peshawar</option>
              </select>
              {error?.city && <p className="text-danger m-0">{error?.city}</p>}
            </div>
          </div>
          <div className="col-md-6 mt-3">
            <div className="form-group">
              <label className="ms-3">Location</label>
              <input
                type="text"
                onChange={onChange}
                name="location"
                className="form-control"
              />
              {error?.location && (
                <p className="text-danger m-0">{error?.location}</p>
              )}
            </div>
          </div>

          <div className="col-md-6 mt-3">
            <div className="form-group">
              <label className="ms-3">No Of Slots</label>
              <select
                id="inputState"
                onChange={onChange}
                name="no_of_slots"
                className="form-control"
              >
                <option value="option" disabled="" selected="">
                  Choose...
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
              {error?.city && <p className="text-danger m-0">{error?.city}</p>}
            </div>
          </div>

          <div className="col-md-6 mt-3">
            <div className="form-group">
              <label className="ms-3">Details</label>
              <input
                type="text"
                onChange={onChange}
                name="details"
                className="form-control"
              />
              {error?.details && (
                <p className="text-danger m-0">{error?.details}</p>
              )}
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-10">
            <button className="login-btn mt-3 mb-2 fw-bold">
              {isSubmitting ? <Spinner /> : "SAVE"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddSalon;
