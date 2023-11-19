import React, { useState } from "react";
import { errorValidate } from "../../validations/errorHandleJoi";
import { storeValidate } from "../../validations/StoreValidation";
import { set_store_info } from "../../redux/slices/userSlice";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import apis from "../../services";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const SalonInfo = () => {
  const { data: categories } = useQuery(["get_store_categories"], () =>
    apis.get_store_category()
  );

  const { user, storeInfo } = useSelector((e) => e.user);
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(null);
  const [data, setData] = useState({
    name: storeInfo?.name,
    segment_Id: storeInfo?.segment_Id,
    salon_owner_Id: user?._id,
    category_Id: storeInfo?.category_Id,
    country: storeInfo?.country,
    city: storeInfo?.city,
    phone: storeInfo?.phone,
    details: storeInfo?.details,
    no_of_slots: storeInfo?.no_of_slots,
    location: storeInfo?.location,
    latitude: 1234,
    longitude: 4567,
    image: storeInfo?.image,
  });

  const onChange = (e) => {
    const { name, value, files } = e.target || {};
    if (files) {
      setImagePreview(URL.createObjectURL(files?.[0]));
      setData((prevData) => ({ ...prevData, [name]: files?.[0] }));
    } else {
      setData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  let [error, setError] = useState();
  console.log(error, "error");
  const { mutate, isLoading: isSubmitting } = useMutation(apis.updateStore, {
    onError: function ({ message }) {
      setError("");
      toast.error(message?.message, { id: 1 });
    },
    onSuccess: ({ data: user, status }) => {
      if (status === 200) {
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
      mutate(storeInfo?._id, form_data);
    } else {
      setError(response);
    }
  };

  return (
    <div className="container">
      <form onSubmit={create__store}>
        {imagePreview && (
          <img
            src={storeInfo?.image}
            className="img-fluid d-block mx-auto salonProfileImage"
            alt=""
          />
        )}

        <div className="row">
          <div className="col-md-6 mt-3">
            <div className="form-group">
              <label className="ms-3">Salon Name</label>
              <input
                type="text"
                name="name"
                onChange={onChange}
                value={data?.name}
                className="form-control"
              />
              {error?.name && <p className="text-danger m-0">{error?.name}</p>}
            </div>
          </div>
          <div className="col-md-6 mt-3">
            <div className="form-group">
              <label className="ms-3">Salon Type</label>
              <select
                onChange={onChange}
                name="segment_Id"
                value={storeInfo?.segment_Id}
                className="form-control"
              >
                <option value="" disabled="" selected>
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
                onChange={onChange}
                name="category_Id"
                value={data?.category_Id}
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
                defaultValue={storeInfo?.phone}
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
                value={data?.country}
                className="form-control"
              >
                <option value="" disabled="" selected="">
                  Choose...
                </option>
                <option className="Pakistan">Pakistan</option>
                <option className="Iran">Iran</option>
                <option className="India">India</option>
                <option className="Afghanistan">Afghanistan</option>
                <option className="Saudi Arabia">Saudi Arabia</option>
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
                value={data?.city}
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
              <label className="ms-3">No Of Slots</label>
              <select
                id="inputState"
                onChange={onChange}
                name="no_of_slots"
                value={data?.no_of_slots}
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
              {error?.no_of_slots && (
                <p className="text-danger m-0">{error?.no_of_slots}</p>
              )}
            </div>
          </div>
          <div className="col-md-6 mt-3">
            <div className="form-group">
              <label className="ms-3">Profile Image</label>
              <input
                type="file"
                name="image"
                accept="image/png, image/gif, image/jpeg"
                className="form-control"
                onChange={onChange}
              />
              {error?.images && (
                <p className="text-danger m-0">{error?.images}</p>
              )}
            </div>
          </div>
          <div className="col-md-6 mt-3">
            <div className="form-group">
              <label className="ms-3">Details</label>

              <textarea
                rows="4"
                onChange={onChange}
                name="details"
                defaultValue={data?.details}
                className="form-control rounded-4"
              ></textarea>
              {error?.details && (
                <p className="text-danger m-0">{error?.details}</p>
              )}
            </div>
          </div>
          <div className="col-md-6 mt-3">
            <div className="form-group">
              <label className="ms-3">Location</label>
              <textarea
                rows="4"
                onChange={onChange}
                name="location"
                defaultValue={data?.location}
                className="form-control rounded-4"
              ></textarea>
              {error?.location && (
                <p className="text-danger m-0">{error?.location}</p>
              )}
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-sm-10">
            <button className="login-btn mt-3 mb-2 fw-bold">
              {isSubmitting ? <Spinner /> : "UPDATE"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SalonInfo;
