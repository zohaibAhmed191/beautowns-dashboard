import React, { useEffect, useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import apis from "../../services";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { staffValidate } from "../../validations/StaffValidation";
import { errorValidate } from "../../validations/errorHandleJoi";
import { Spinner } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import imageIcon from "../assets/imageIcon.png";
import { TbPhotoEdit } from "react-icons/tb";

const AddStaff = ({ setStaff_id, isEdit, staff_details }) => {
  const { storeInfo } = useSelector((e) => e.user);
  const [imagePreview, setImagePreview] = useState(null);
  const [data, setData] = useState({
    store_Id: storeInfo?._id,
    name: "",
    title: "",
    email: "",
    description: "",
    phone: "",
    gender: "",
    password: "",
    image: null,
  });

  useEffect(() => {
    setData({
      store_Id: storeInfo?._id,
      name: staff_details?.name,
      title: staff_details?.title,
      description: staff_details?.description,
      phone: staff_details?.phone,
      gender: staff_details?.gender,
      email: staff_details?.email,
      password: "",
      image: staff_details?.image,
    });
  }, [staff_details]);

  console.log(data, "data");

  const onChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setImagePreview(URL.createObjectURL(files?.[0]));
      setData((prevData) => ({ ...prevData, [name]: files?.[0] }));
    } else {
      setData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  let [error, setError] = useState();
  console.log(error, "error");

  const { mutate, isLoading: isSubmitting } = useMutation(apis.add_staff, {
    onError: function ({ message }) {
      setError("");
      toast.error(message?.message, { id: 1 });
    },
    onSuccess: ({ data: user, status }) => {
      if (status === 201) {
        // navigate("/staff");
        setStaff_id(user?.staff?._id);
        toast.success(user?.message, { id: 1 });
      }
    },
  });
  const { mutate: updateStaff, isLoading: isUpdating } = useMutation(
    apis.update_Staff,
    {
      onError: function ({ message }) {
        setError("");
        toast.error(message?.message, { id: 1 });
      },
      onSuccess: ({ data: user, status }) => {
        if (status === 200) {
          toast.success(user?.message, { id: 1 });
        }
      },
    }
  );

  const add_staff = (e) => {
    e.preventDefault();
    const form_data = new FormData();
    for (const [key, value] of Object.entries(data)) {
      if (isEdit && key === "store_Id") {
        continue;
      }
      form_data.append(key, value);
    }
    let response = errorValidate(staffValidate(data));
    if (response === true) {
      if (isEdit) {
        updateStaff(staff_details?._id, form_data);
      } else {
        if(data?.image){
          mutate(form_data);
        }else{
          toast.error("Please select image");
        }
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
      <h2 className="text-uppercase fw-bold">
        {isEdit ? "Update Staff" : "Add Staff"}
      </h2>
      <form onSubmit={add_staff}>
        <img
          src={imagePreview || staff_details?.image || imageIcon}
          onClick={triggerFileInput}
          className="img-fluid d-block mx-auto salonProfileImage"
          alt="cate"
        />
        <TbPhotoEdit
          onClick={triggerFileInput}
          className="text-center hc d-block mx-auto fs-4 mt-1"
        />
        <div className="row">
          <input
            type="file"
            name="image"
            accept="image/png, image/gif, image/jpeg"
            onChange={handleFileSelection}
            ref={fileInputRef}
            className="d-none"
          />
          <div className="col-md-6 mt-3">
            <div className="form-group">
              <label className="ms-3">Staff Name</label>
              <input
                type="text"
                name="name"
                value={data?.name}
                onChange={onChange}
                className="form-control"
              />
            </div>
            {error?.name && <p className="m-0 text-danger">{error?.name}</p>}
          </div>
          <div className="col-md-6 mt-3">
            <div className="form-group">
              <label className="ms-3">Staff Title</label>
              <input
                type="text"
                value={data?.title}
                name="title"
                onChange={onChange}
                className="form-control"
              />
            </div>
            {error?.title && <p className="m-0 text-danger">{error?.title}</p>}
          </div>
          <div className="col-md-6 mt-3">
            <div className="form-group">
              <label className="ms-3">Staff Email</label>
              <input
                type="email"
                name="email"
                value={data?.email}
                onChange={onChange}
                className="form-control"
              />
            </div>
            {error?.email && <p className="m-0 text-danger">{error?.email}</p>}
          </div>
          <div className="col-md-6 mt-3">
            <div className="form-group">
              <label className="ms-3">
                {isEdit ? "New Password" : "Staff Password"}
              </label>
              <input
                type="password"
                name="password"
                onChange={onChange}
                className="form-control"
              />
            </div>
            {error?.password && (
              <p className="m-0 text-danger">{error?.password}</p>
            )}
          </div>
          <div className="col-md-6 mt-3">
            <div className="form-group">
              <label className="ms-3">Staff Gender</label>
              <select
                name="gender"
                value={data?.gender}
                className="form-control"
                onChange={onChange}
              >
                <option value="" selected>
                  Choose...
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            {error?.gender && (
              <p className="m-0 text-danger">{error?.gender}</p>
            )}
          </div>
          <div className="col-md-6 mt-3">
            <div className="form-group">
              <label className="ms-3">Staff Phone</label>
              <PhoneInput
                country={"pk"}
                value={data?.phone}
                name="phone"
                onChange={(value) => setData({ ...data, phone: value })}
              />
            </div>
            {error?.phone && <p className="m-0 text-danger">{error?.phone}</p>}
          </div>

          <div className="col-12 mt-3">
            <div className="form-group">
              <label className="ms-3">Description</label>
              <textarea
                id=""
                rows="4"
                name="description"
                value={data?.description}
                onChange={onChange}
                className="form-control rounded-4"
              ></textarea>
            </div>
            {error?.description && (
              <p className="m-0 text-danger">{error?.description}</p>
            )}
          </div>

          <div className="col-lg-4 col-md-6 col-sm-10 mx-auto">
            <button className="login-btn mt-3 mb-2 fw-bold" disabled={isSubmitting || isUpdating} type="submit">
              {isSubmitting || isUpdating ? <Spinner /> : "SAVE"} 
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddStaff;
