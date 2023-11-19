import React, { useState, useEffect } from "react";
import CategoryTable from "../Table/CategoryTable";
import AddCategoryModal from "../Modal/AddCategoryModal";
import nodata from "../assets/no_data_found.webp";
import apis from "../../services";
import { useSelector } from "react-redux";

const CategoryComp = () => {
  const [showModal, setShowModal] = useState(false);
  const { storeInfo } = useSelector((e) => e?.user);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);

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
      setCategories([]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {isLoading && <div id="cover-spin"></div>}
      <AddCategoryModal
        showModal={showModal}
        getCategories={getCategories}
        setShowModal={setShowModal}
      />
      <div className="d-flex flex-wrap p-2 flex-wrap align-items-center w-100 justify-content-between">
        <h1 className="m-0 my-3">Service Category</h1>
        <div className="col-lg-2 col-md-3 col-sm-4">
          <button
            className="login-btn my-3 fw-bold"
            onClick={() => setShowModal(true)}
          >
            ADD
          </button>
        </div>
      </div>
      {categories?.length > 0 ? (
        <CategoryTable
          getCategories={getCategories}
          categories={categories}
        />
      ) : (
        <div className="col-md-3 mx-auto">
          <img
            src={nodata}
            className="img-fluid m-0 d-block mx-auto"
            alt="no data found"
          /> 
          <p className="text-center h_u margin--top" onClick={() => setShowModal(true)}>
            ADD NEW CATEOGRY
          </p>
        </div>
      )}
    </>
  );
};

export default CategoryComp;
