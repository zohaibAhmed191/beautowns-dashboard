import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaUsers, FaRegClock } from "react-icons/fa6";
import { GiPriceTag } from "react-icons/gi";
import { PiGenderFemaleBold } from "react-icons/pi";
import { BiCategory } from "react-icons/bi";
import { MdOutlineDescription } from "react-icons/md";
import toast from "react-hot-toast";
import apis from "../../services";

const ServiceDetailsComp = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [service, setService] = useState();
  const [category, setCatgory] = useState();
  const getService = async () => {
    try {
      setIsLoading(true);
      const response = await apis.get_single_service(id);
      setService(response?.data?.service);
      if (response && response?.data && response?.data?.service) {
        const getcategory = await apis.get_single_service_category(
          response?.data?.service?.service_category_Id
        );
        setCatgory(getcategory?.data?.storeCategories);
      }
      setIsLoading(false);
    } catch (error) {
      if (error?.message?.message) {
        toast.error(error?.message?.message, { id: 1 });
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getService();
    } else {
      navigate("/services");
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container">
      {isLoading && <div id="cover-spin"></div>}
      <img src={service?.image} className="img-fluid serviceImg" alt="" />
      <h2 className="mt-2 text-center text-lg-start">{service?.name}</h2>
      <div className="row mt-2">
        <div className="col-lg-3 col-md-6 mt-3">
          <div className="serivce-blocks d-flex align-items-center">
            <FaUsers className="serviceIcons" />
            <div className="d-flex w-100 flex-column align-items-center">
              <p className="m-0">NO OF STAFF</p>
              <h3 className="m-0">{service?.noOfPeople}</h3>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 mt-3">
          <div className="serivce-blocks d-flex align-items-center">
            <PiGenderFemaleBold className="serviceIcons" />
            <div className="d-flex w-100 flex-column align-items-center">
              <p className="m-0 text-uppercase">Service For</p>
              <h3 className="m-0">
                {" "}
                {service?.segment_Id === 1
                  ? "MALE"
                  : service?.segment_Id === 2
                  ? "FEMALE"
                  : service?.segment_Id === 3
                  ? "BOTH"
                  : ""}
              </h3>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 mt-3">
          <div className="serivce-blocks d-flex align-items-center">
            <BiCategory className="serviceIcons" />
            <div className="d-flex w-100 flex-column align-items-center">
              <p className="m-0">Category</p>
              <h3 className="m-0">{category?.name}</h3>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 mt-3">
          <div className="serivce-blocks d-flex align-items-center">
            <GiPriceTag className="serviceIcons" />
            <div className="d-flex w-100 flex-column align-items-center">
              <p className="m-0 text-uppercase">Charges</p>
              <h3 className="m-0">{service?.value} PKR</h3>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 mt-3">
          <div className="serivce-blocks d-flex align-items-center">
            <FaRegClock className="serviceIcons" />
            <div className="d-flex w-100 flex-column align-items-center">
              <p className="m-0 text-uppercase">Duration</p>
              <h3 className="m-0">{service?.duration} Min</h3>
            </div>
          </div>
        </div>
        <div className="col-lg-9 col-md-6 mt-3">
          <div className="serivce-blocks d-flex align-items-center">
            <MdOutlineDescription className="serviceIcons" />
            <div className="d-flex w-100 flex-column align-items-center">
              <p className="m-0 text-uppercase">Description</p>
              <h6 className="m-0">{service?.description}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsComp;
